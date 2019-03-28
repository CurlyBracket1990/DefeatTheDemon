import React, { PureComponent } from 'react'
import './ImageSelection.css'
import necroImage from '../../images/champions/necro.png'
import monkImage from '../../images/champions/monk.png'
import skeletonImage from '../../images/champions/skeleton.png'
import marksmanImage from '../../images/champions/marksman.png'
import mageImage from '../../images/champions/mage.png'
import guardImage from '../../images/champions/guard.png'
import knightImage from '../../images/champions/knight.png'


export default class ImageSelection extends PureComponent {
state = { 
    hero: "",
    selectedSymbol: "" 
}

imageSelecter = (image) => {
const { player } = this.props
console.log(player, "PLAYer")
if (player) {
    switch (image) {
        case 'necro':
            player.symbol = "n"
            this.setState({
                hero: "necro"
            })
            break;
        case 'monk':
            player.symbol = "x"
            this.setState({
                hero: "monk"
            })
            break;
        case 'marksman':
            player.symbol = "z"
            this.setState({
                hero: "marksman"
            })
            break;
        case 'guard':
            player.symbol = "g"
            this.setState({
                hero: "guard"
            })
            break;
        case 'knight':
            player.symbol = "y"
            this.setState({
                hero: "knight"
            })
            break;
        case 'mage':
            player.symbol = "m"
            this.setState({
                hero: "mage"
            })
            break;
        case 'skeleton':
            player.symbol = "s"
            this.setState({
                hero: "skeleton"
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

render() {

    return (
        <div className="image-selection">
            <div className="champ-images">
            
                {<img src= {necroImage} alt='necro' onClick={this.clickhandler} />}
                {<img src= {monkImage} alt='monk'onClick={this.clickhandler}/>}
                {<img src= {marksmanImage} alt='marksman'onClick={this.clickhandler}/>}
                {<img src= {guardImage} alt='guard'onClick={this.clickhandler}/>}
                {<img src= {knightImage} alt='knight'onClick={this.clickhandler}/>}
                {<img src= {mageImage} alt='mage'onClick={this.clickhandler}/>}
                {<img src= {skeletonImage} alt='skeleton'onClick={this.clickhandler}/>}
            
            </div>
            {this.state.hero.length > 1 && <p>You've selected the {this.state.hero} hero.</p>}
        </div>
    )
}

}