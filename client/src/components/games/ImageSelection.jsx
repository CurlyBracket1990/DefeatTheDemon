import React, { PureComponent } from 'react'

import demonFrontImage from '../../images/enemies/demonFront.png'
import necroImage from '../../images/champions/necro.png'
import monkImage from '../../images/champions/monk.png'


export default class ImageSelection extends PureComponent {

    state = {
        hero: "",
        selectedSymbol: ""
    }

    imageSelecter = (image) => {
        const { player } = this.props
        if (player) {
            switch (image) {
                case 'necro':
                    player.symbol = "n"
                    this.setState({
                        hero: "necro"
                    })
                    break;
                case 'monk':
                    player.symbol = "m"
                    this.setState({
                        hero: "monk"
                    })
                    break;
                case 'demonF':
                    player.symbol = "z"
                    this.setState({
                        hero: "demon"
                    })
                    break;
                default:
                    break;
            }
        }

        else {
            switch (image) {
                case 'necro':
                    this.setState({
                        hero: "necro",
                        selectedSymbol: "n"
                    })
                    break;
                case 'monk':
                    this.setState({
                        hero: "monk",
                        selectedSymbol: "m"
                    })
                    break;
                case 'demonF':
                    this.setState({
                        hero: "demon",
                        selectedSymbol: "z"
                    })
                    break;
                default:
                    break;
            }
        }

    }

    clickhandler = (event) => {
        this.imageSelecter(event.target.alt)
    }

    handleJoinClick = () => {
        if(!this.state.selectedSymbol){
            alert("please select a hero")
            return null
        }
        this.props.joinGame(this.state.selectedSymbol)
    }

    render() {
        const {game, userId} = this.props
        return (
            <div className="image-selection">
                <ul>
                    <li>{<img src={necroImage} alt='necro' onClick={this.clickhandler} />}</li>
                    <li>{<img src={monkImage} alt='monk' onClick={this.clickhandler} />}</li>
                    <li>{<img src={demonFrontImage} alt='demonF' onClick={this.clickhandler} />}</li>
                </ul>
                {this.state.hero.length > 1 && <p>You've selected the {this.state.hero} hero.</p>}

                {
                    game.status === 'pending' &&
                    game.players.map(p => p.userId).indexOf(userId) === -1 &&
                    <button onClick={this.handleJoinClick}>Join Game</button>
                }
            </div>


        )
    }

}