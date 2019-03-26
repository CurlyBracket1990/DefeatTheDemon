import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
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

makeMove = (toRow, toCell) => {
  const {game, updateGame} = this.props
  
  // function checkX (varss){
  //   return varss = "x"
  // }
  // const newXX = game.board.find(checkX)

  // console.log(toRow, toCell, "I M CELL", newXX)
  // console.log(game.board, "BOARD")

  const board = game.board.map(
    (row, rowIndex) => row.map((cell, cellIndex) => {
      // console.log(row, "I M ROW")
      // console.log(rowIndex, "I M ROWINDEX")
      // console.log(cell, "I M CELL")

      const playerPos = [row, cell]
      const playPos = playerPos.find((def) => def === "x")
      const  indexPos = [rowIndex, cellIndex]
      console.log(playPos, "PlayPos", cell)
      console.log(indexPos, "indexPOS")
      if (rowIndex === toRow && cellIndex === toCell) {
        console.log(this.playPos, "HHH")
        // if(playerPos === [toRow, toCell] ) {
        //   return console.log("WAOW")
        // } 
        // console.log(toRow, "ROWTOCELL", toCell)
        // if ([toRow +1, toCell] === this.playerPos || [toRow -1, toCell] === this.playerPos )
        // {return console.log("VAOW")}

        // console.log([toRow +1, toCell] === this.playerPos)
        
        // console.log(this.playerPos, "POSSS")  
        // console.log([toRow +1, toCell], "ROWW")  
        return game.turn  
      }
      if(cell===game.turn){
        // console.log(cell,"celll")
        return null
      }
      else return cell
    })
  )
  updateGame(game.id, board)
}



render() {
  const {game, users, authenticated, userId} = this.props

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
