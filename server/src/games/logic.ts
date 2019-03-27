import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Row, Champion, Player } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const datas = [ "x", "y", null, "<", "v", "^", ">" ]
    return board.length === 5 &&
      board.every(row =>
        row.length === 5 &&
        row.every(tile => datas.includes(tile))
      )
  }
}

export const isValidTransition = (playerSymbol: Champion["symbol"], from: Board, to: Board, playerPos:number[], newPlayerPos:number[]) => {
  const changes = from
    .map(
      (row, rowIndex) => row.map((symbol, columnIndex) => ({
        from: symbol, 
        to: to[rowIndex][columnIndex]
      }))
    )
    .reduce((a,b) => a.concat(b))
    .filter(change => change.from !== change.to)


    // from.map(
    //   (row, rowIndex) => row.map((cell, cellIndex) => {
    //     if (rowIndex === toRow && cellIndex === toCell) {
    //       return newPlayerPos = [toRow, toCell]
    //     }
    //     if (cell === game.turn) {
    //       return playerPos = [rowIndex, cellIndex]
    //     }
    //   })
    // )

  return changes.length < 3 
  && ((playerPos[0]-1 === newPlayerPos[0] && playerPos[1] === newPlayerPos[1])
  || (playerPos[0]+1 === newPlayerPos[0] && playerPos[1] === newPlayerPos[1])
  || (playerPos[0] === newPlayerPos[0] && playerPos[1]-1 === newPlayerPos[1])
  || (playerPos[0] === newPlayerPos[0] && playerPos[1]+1 === newPlayerPos[1]))
  // && 
  //   changes[0].to === null || 
  //   changes[0].from === playerSymbol &&
  //   changes[1].to === playerSymbol && 
  //   changes[1].from === playerSymbol
}

// export const calculateWinner = (board: Board): Symbol | null =>
//   board
//     .concat(
//       // vertical winner
//       [0, 1, 2].map(n => board.map(row => row[n])) as Row[]
//     )
//     .concat(
//       [
//         // diagonal winner ltr
//         [0, 1, 2].map(n => board[n][n]),
//         // diagonal winner rtl
//         [0, 1, 2].map(n => board[2-n][n])
//       ] as Row[]
//     )
//     .filter(row => row[0] && row.every(symbol => symbol === row[0]))
//     .map(row => row[0])[0] || null

// export const finished = (board: Board): boolean =>
//   board
//     .reduce((a,b) => a.concat(b) as Row)
//     .every(symbol => symbol !== null)
