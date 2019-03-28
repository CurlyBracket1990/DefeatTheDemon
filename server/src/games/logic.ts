import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Row } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const datas = ["x", "y", null, "<", "v", "^", ">"]
    return board.length === 5 &&
      board.every((row: Row) =>
        row.length === 6 &&
        row.every(tile => datas.includes(tile))
      )
  }
}

let enemyCount = 0

export const updateEnemyCount = (board: Board) => {
  let enemyCount = 0
  board.map((row: Row) => {
    row.map((cell) => {
      if (cell === "v" || cell === ">" || cell === "^" || cell === "<") {
        enemyCount = enemyCount + 1
      }
      return null
    })
  })
  return enemyCount
}

const createRandomEnemy = (level) => {
  const randomNumber = Math.random()
  switch (true) {
    case randomNumber <= 0.7:
      return null

    case randomNumber > 0.7 && randomNumber <= 0.75 && enemyCount < (level * 3):
      enemyCount++
      return '>'
    case randomNumber > 0.75 && randomNumber <= 0.8 && enemyCount < (level * 3):
      enemyCount++
      return '<'
    case randomNumber > 0.8 && randomNumber <= 0.85 && enemyCount < (level * 3):
      enemyCount++
      return '^'
    case randomNumber > 0.85 && enemyCount < (level * 3):
      enemyCount++
      return 'v'
    default:
      return null
  }
}

const createRandomRow = (level) => {
  return [createRandomEnemy(level), createRandomEnemy(level), createRandomEnemy(level), createRandomEnemy(level), createRandomEnemy(level), createRandomEnemy(level)]
}

const createStartRow = () => {
  return ["x", null, null, null, null, "y"]
}

export const createNewBoard = (level): Board => {
  enemyCount = 0
  return [createRandomRow(level) as Row, createRandomRow(level) as Row, createRandomRow(level) as Row, createRandomRow(level) as Row, createStartRow() as Row]
}

export const isValidTransition = (from: Board, to: Board, playerPos: number[], newPlayerPos: number[]) => {
  const changes = from
    .map(
      (row, rowIndex) => row.map((symbol, columnIndex) => ({
        from: symbol,
        to: to[rowIndex][columnIndex]
      }))
    )
    .reduce((a, b) => a.concat(b))
    .filter(change => change.from !== change.to)

  return changes.length < 3
    && ((playerPos[0] - 1 === newPlayerPos[0] && playerPos[1] === newPlayerPos[1])
      || (playerPos[0] + 1 === newPlayerPos[0] && playerPos[1] === newPlayerPos[1])
      || (playerPos[0] === newPlayerPos[0] && playerPos[1] - 1 === newPlayerPos[1])
      || (playerPos[0] === newPlayerPos[0] && playerPos[1] + 1 === newPlayerPos[1]))
}

export const battleWinner = (playerPos, newPlayerPos, newPosSymbol) => {
  if (newPosSymbol === ">") {
    if (playerPos[1] - 1 === newPlayerPos[1]) {
      return false
    }
    return true
  }
  else if (newPosSymbol === "<") {
    if (playerPos[1] + 1 === newPlayerPos[1]) {
      return false
    }
    return true
  }
  else if (newPosSymbol === "^") {
    if (playerPos[0] + 1 === newPlayerPos[0]) {
      return false
    }
    return true
  }
  else if (newPosSymbol === "v") {
    if (playerPos[0] - 1 === newPlayerPos[0]) {
      return false
    }
    return true
  }

  else {
    return true
  }
}

export const startNewLevel = (game, player) => {
  if (game.status === 'Level completed!') {
    game.status = "started"
    game.currentLevel = game.currentLevel + 1
    game.turn = player.symbol === 'x' ? 'y' : 'x'
    game.board = createNewBoard(game.currentLevel)
    game.enemyCount = updateEnemyCount(game.board)
    game.totalMoves = (game.enemyCount * 2) + 5
    return game
  }
}

export const tryToAttackPlayer = (newPosSymbol) => {
  if (newPosSymbol === "x" || newPosSymbol === "y") {
    return true
  }
  return false
}

export const calculateWinner = (enemyCount: number) => {
  if (enemyCount === 0) {
    return true
  }
  return false
}
