import React, { PureComponent } from 'react'
import './GameInformation.css'

export default class GameInformation extends PureComponent {

    

render() {
    const { game } = this.props
    return (
        <div className="game-information">
            {game.turn === "x" && <p>Make a move player 1!</p>}
            {game.turn === "y" && <p>Make a move player 2!</p>}
            <p>Moves left: {game.totalMoves}</p>
            <p>Enemys left: {game.enemyCount}</p>
        </div>
    )
}

}