import React from 'react'
import './Board.css'

const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn) => {
  if(rowIndex === 3 && cellIndex === 0){
    return (
      <button
        className="board-tile"
        disabled={hasTurn}
        onClick={() => makeMove(rowIndex, cellIndex)}
        key={`${rowIndex}-${cellIndex}`}
      >{symbol || 'x'}</button>
    )
  }

  if(rowIndex === 3 && cellIndex === 3){
    return (
      <button
        className="board-tile"
        disabled={hasTurn}
        onClick={() => makeMove(rowIndex, cellIndex)}
        key={`${rowIndex}-${cellIndex}`}
      >{symbol || 'y'}</button>
    )
  }

  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    >{symbol || ''}</button>
  )
}

export default ({board, makeMove}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false))}
  </div>
)
