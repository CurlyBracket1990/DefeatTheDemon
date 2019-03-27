import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Row, Champion } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const datas = ["x", "y", null, "<", "v", "^", ">"]
    return board.length === 5 &&
      board.every(row =>
        row.length === 6 &&
        row.every(tile => datas.includes(tile))
      )
  }
}

export const updateEnemyCount = (board) => {
  let enemyCount = 0
  board.map((row) => {
    row.map((cell) => {
      if(cell === "v" || cell === ">" || cell === "^" || cell === "<"){
        enemyCount = enemyCount +1
      }
      return null
    })
  })
  return enemyCount
}

export const isValidTransition = (playerSymbol: Champion["symbol"], from: Board, to: Board, playerPos: number[], newPlayerPos: number[], newPosSymbol: string) => {
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
    && battleWinner(playerPos, newPlayerPos, newPosSymbol)
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
  else if (newPosSymbol === "x" || newPosSymbol === "y") {
      return false
  }
  
  else {
    return true
  }
}

export const calculateWinner = (enemyCount: number) => {
  if (enemyCount === 0) {
    return true
  }
  return false
}
