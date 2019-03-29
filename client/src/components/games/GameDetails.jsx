import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getGames, joinGame, updateGame, updatePlayerSymbol } from '../../actions/games'
import { getUsers } from '../../actions/users'
import { userId } from '../../jwt'
import Paper from '@material-ui/core/Paper'
import Board from './Board'
import './GameDetails.css'
import skeletonImage from '../../images/champions/skeleton.png'
import marksmanImage from '../../images/champions/marksman.png'
import mageImage from '../../images/champions/mage.png'
import guardImage from '../../images/champions/guard.png'
import knightImage from '../../images/champions/knight.png'
import demonLeftImage from '../../images/enemies/demonLeft.png'
import demonRightImage from '../../images/enemies/demonRight.png'
import demonFrontImage from '../../images/enemies/demonFront.png'
import demonBackImage from '../../images/enemies/demonBack.png'
import necroImage from '../../images/champions/necro.png'
import monkImage from '../../images/champions/monk.png'
import terrainImage from '../../images/terrains/terrain1.png'
import PlayerManual from './PlayerManual'
import GameInformation from './GameInformation'
import ImageSelection from './ImageSelection';

class GameDetails extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = (symbol) => {
    this.props.joinGame(this.props.game.id, symbol)
  }


  enemyImage = (symbol) => {
    if (symbol === "<") {
      return <img src={demonLeftImage} alt="<" />
    } else if (symbol === ">") {
      return <img src={demonRightImage} alt=">" />
    } else if (symbol === "^") {
      return <img src={demonBackImage} alt="^" />
    } else if (symbol === "v") {
      return <img src={demonFrontImage} alt="v" />
    } else if (symbol === "n") {
      return <img src={necroImage} alt="n" />
    } else if (symbol === "x") {
      return <img src={monkImage} alt="x" />
    } else if (symbol === "z") {
      return <img src={marksmanImage} alt="z" />
    } else if (symbol === "g") {
      return <img src={guardImage} alt="g" />
    } else if (symbol === "y") {
      return <img src={knightImage} alt="y" />
    } else if (symbol === "m") {
      return <img src={mageImage} alt="m" />
    } else if (symbol === "s") {
      return <img src={skeletonImage} alt="s" />
    }

    else return <img src={terrainImage} alt="-" />
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
        winner &&
        <p>Winner: {users[winner].firstName}</p>
      }

      <hr />

      {
        game.status !== 'pending' &&
        <PlayerManual />
      }
      {
        game.status === 'pending' && <ImageSelection updatePlayerSymbol={this.props.updatePlayerSymbol} game={game} userId={userId} joinGame={this.joinGame} />
      }
      <div className="container">
        <div>
          {
            game.status !== 'pending' &&
            <Board board={game.board} makeMove={this.makeMove} enemyImage={this.enemyImage} />
          }
        </div>
        {
          game.status === 'started' &&
          <GameInformation game={game} />
        }
      </div>

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
  getGames, getUsers, joinGame, updateGame, updatePlayerSymbol
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)