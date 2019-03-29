import React, { Component } from 'react';
import mountains from '../songs/Mountains.mp3'
import danger from '../songs/danger.mp3'
import Sound from 'react-sound'
import champSelectSong from '../songs/champSelection.mp3'

export default class Song extends Component {
render() {
return (
   <Sound
   
   url= {this.props.game === 'pending' && champSelectSong ||
        this.props.game === 'started' && danger }
   playStatus={Sound.status.PLAYING}
   onLoading={this.handleSongLoading}
   playFromPosition={1000 /* in milliseconds */}
//    onPlaying={this.handleSongPlaying}
//    onFinishedPlaying={this.handleSongFinishedPlaying}
   loop = {true}
   />
    )
}
}
