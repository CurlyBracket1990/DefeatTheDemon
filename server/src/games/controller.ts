import {
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get,
  Body, Patch
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player, Board } from './entities'
import { IsBoard, isValidTransition, calculateWinner, tryToAttackPlayer, updateEnemyCount, battleWinner, createNewBoard, startNewLevel } from './logic'
import { Validate } from 'class-validator'
import { io } from '../index'
// import { AdvancedConsoleLogger } from 'typeorm';
// import { Entity } from 'typeorm';

class GameUpdate {

  @Validate(IsBoard, {
    message: 'Not a valid board'
  })
  board: Board
  playerPos: [number]
  newPlayerPos: [number]
  newPosSymbol: string
}

@JsonController()
export default class GameController {

  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {

    const entity = await Game.create()
    await (entity.enemyCount = 0)
    await entity.save()

    await Player.create({
      game: entity,
      user,
      symbol: 'x'
    }).save()

    const game = await Game.findOneById(entity.id)
    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })
    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)

    if (game) game.board = createNewBoard(game.currentLevel)

    let enemyCount = 0

    if (game) {
      game.board.map(
        (row) => row.map((cell) => {
          if (cell === ">" || cell === "<" || cell === "^" || cell === "v") {
            enemyCount = enemyCount + 1
            return null
          }
          return null
        })
      )
    }
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)

    game.status = 'started'
    game.enemyCount = enemyCount
    await game.save()

    const player = await Player.create({
      game,
      user,
      symbol: 'y'
    }).save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: await Game.findOneById(game.id)
    })

    return player
  }

  @Authorized()
  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update: GameUpdate
  ) {
    const game = await Game.findOneById(gameId)
    let playerSymbol1 = ''
    let playerSymbol2 = ''

    if (game) {
      playerSymbol1 = game.players[0].symbol
      playerSymbol2 = game.players[1].symbol
    }

    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })

    if (!player) throw new ForbiddenError(`You are not part of this game`)

    if (game.status === 'pending') throw new BadRequestError(`The game is not started yet`)


    if (game.status === 'Game over!') throw new BadRequestError(`The game has ended`)

    if (player.symbol !== game.turn) throw new BadRequestError(`It's not your turn`)

    if (!isValidTransition(game.board, update.board, update.playerPos, update.newPlayerPos)) {
      throw new BadRequestError(`You can only move up, down, left and right.`)
    }

    if (tryToAttackPlayer(update.newPosSymbol)) {
      throw new BadRequestError(`I don't think your teammate will like that..`)
    }

    if (!battleWinner(update.playerPos, update.newPlayerPos, update.newPosSymbol)) {
      game.totalMoves = game.totalMoves - 1
      game.turn = player.symbol === playerSymbol1 ? playerSymbol2 : playerSymbol1
      await game.save()

      io.emit('action', {
        type: 'UPDATE_GAME',
        payload: game
      })

      return game
    }

    game.totalMoves = game.totalMoves - 1
    game.enemyCount = updateEnemyCount(update.board)

    const winner = calculateWinner(game.enemyCount)

    if (winner) {
      game.defeatedTheDemon = true
      game.status = 'Level completed!'
      startNewLevel(game, player)
      await game.save()

      io.emit('action', {
        type: 'UPDATE_GAME',
        payload: game
      })

      return game

    }
    else if (game.totalMoves < 1) {
      game.status = 'Game over!'
    }
    else {
      game.turn = player.symbol === playerSymbol1 ? playerSymbol2 : playerSymbol1
    }
    game.board = update.board
    await game.save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Authorized()
  @Get('/games')
  getGames() {
    return Game.find()
  }
}