import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Row, Champion } from './entities'

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

export const updateEnemyCount = (board: Board) => {
  let enemyCount = 0
  board.map((row: Row) => {
    row.map((cell) => {
      if(cell === "v" || cell === ">" || cell === "^" || cell === "<"){
        enemyCount = enemyCount +1
      }
      return null
    })
  })
  return enemyCount
}

// export const updateMoveCount = (game) => {
  
// }

export const isValidTransition = ( from: Board, to: Board, playerPos: number[], newPlayerPos: number[]) => {
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

export const tryToAttackPlayer = (newPosSymbol) => {
  if (["x","y","z","n","m"].includes(newPosSymbol)) {
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
