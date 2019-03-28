import React, { PureComponent } from 'react'

import demonLeftImage from '../../images/enemies/demonLeft.png'
import demonRightImage from '../../images/enemies/demonRight.png'
import demonFrontImage from '../../images/enemies/demonFront.png'
import demonBackImage from '../../images/enemies/demonBack.png'
import necroImage from '../../images/champions/necro.png'
import monkImage from '../../images/champions/monk.png'
import terrainImage from '../../images/terrains/terrain1.png'


export default class ImageSelection extends PureComponent {

// enemyImage = (symbol) => {
//     if (symbol === "<") {
//       return <img src={demonLeftImage} alt="<" />
//     } else if (symbol === ">") {
//       return <img src={demonRightImage} alt=">" />
//     } else if (symbol === "^") {
//       return <img src={demonBackImage} alt="^" />
//     } else if (symbol === "v") {
//       return <img src={demonFrontImage} alt="v" />
//     } else if (symbol === "y") {
//       return <img src={necroImage} alt="y" />
//     } else if (symbol === "x") {
//       return <img src={monkImage} alt="x" />
//     }
//     else return <img src={terrainImage} alt="-" />
//   }

imageSelecter = (image) => {
    const { player } = this.props
    console.log(player, "PLAYer")
    if(image === 'necro') {
        player.symbol = "z"
    }
    switch (image) {
        case 'necro':
            player.symbol = "n"
            break;
        case 'monk':
            player.symbol = "m"
            break;
        case 'demonF':
            player.symbol = "z"
            break;
        default:
            break;
    }
}

clickhandler = (event) => {
    this.imageSelecter(event.target.alt)
}

    render() {
        const {player} = this.props
        console.log(player, "PLAYER222")
        return (
            <div className="image-selection">
                <ul>
                    <li>{<img src= {necroImage} alt='necro' onClick={this.clickhandler} />}</li>
                    <li>{<img src= {monkImage} alt='monk'onClick={this.clickhandler}/>}</li>
                    <li>{<img src= {demonFrontImage} alt='demonF'onClick={this.clickhandler}/>}</li>
                </ul>
            </div>
        )
    }

}