import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getGames, joinGame, updateGame } from '../../actions/games'
import { getUsers } from '../../actions/users'
import { userId } from '../../jwt'
import Paper from '@material-ui/core/Paper'
import Board from './Board'
import './GameDetails.css'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  renderEnemies = () => {
    const playerPos = [0, 0]
    const newPlayerPos = [0, 0]
    const { game, updateGame } = this.props
    let enemyCount = 0
    const board = game.board.map(
      (row) => row.map((cell) => {
        if (cell !== "x" || cell !== "y" || enemyCount > 2) {
          const randomNum = Math.floor(Math.random() * 11)
          if(randomNum < 1) {
            enemyCount++
          return "V"
          }
          return cell
        }
        else return cell
      })
    )
    updateGame(game.id, board, playerPos, newPlayerPos)
  }

  makeMove = (toRow, toCell) => {
    const { game, updateGame } = this.props
    let playerPos = []
    let newPlayerPos = []
    let newPosSymbol = ""

    game.board.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell) {
          newPosSymbol = cell
          return newPlayerPos = [toRow, toCell]
        }
        if (cell === game.turn) {
          return playerPos = [rowIndex, cellIndex]
        }
        return null
      })
    )

    const board = game.board.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell) {
          return game.turn
        }
        if (cell === game.turn) {
          return null
        }
        else return cell
      })
    )
    updateGame(game.id, board, playerPos, newPlayerPos, newPosSymbol)
  }



  render() {
    const { game, users, authenticated, userId } = this.props

    if (!authenticated) return (
      <Redirect to="/login" />
    )

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (<Paper className="outer-paper">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>

      {
        game.status === 'started' &&
        player && player.symbol === game.turn &&
        <div>It's your turn!</div>
      }

      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }

      {
        winner &&
        <p>Winner: {users[winner].firstName}</p>
      }

      <hr />

      {
        game.status !== 'pending' &&
        <Board board={game.board} makeMove={this.makeMove} />
      }
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
