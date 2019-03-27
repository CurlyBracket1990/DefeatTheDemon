import React from 'react'
import './Board.css'

const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn, enemyImage) => {

  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    >{enemyImage(symbol)}</button>
  )
}

export default ({board, makeMove, enemyImage}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false, enemyImage))}
  </div>
)


