import React, { Component } from 'react';
import { Button, Progress } from 'semantic-ui-react';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioPlaying: false,
      progressPercent: 0 
    }
    this.toggleAudio = this.toggleAudio.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
  }
  
  toggleAudio() {
    const audio = document.querySelector('.audio-player--file');
    this.setState({
      audioPlaying: !this.state.audioPlaying
    });
    if(this.state.audioPlaying) {
      audio['play']();
      this.handleProgress()
     } else {
        audio['pause']();
     }    
  }

  handleProgress() {
    const audio = document.querySelector('.audio-player--file');
    const percent = (audio.currentTime / audio.duration);
    this.setState({ progressPercent: percent });
  }
  
  render() {
    return (
      <div className="audio-player-controls">
        <audio className="audio-player--file" src='http://5b9ae60eaaf6858489d5-de7a668058c1db97713a59708a969f8c.r44.cf3.rackcdn.com/fresh86171a1.mp3'></audio>
        <Progress percent={this.state.progressPercent} />
        <Button.Group labeled>
          {(this.state.audioPlaying) ? <Button icon='pause' content='Pause' onClick={this.toggleAudio}/> : 
          <Button icon='play' content='Play' onClick={this.toggleAudio}/>}
          <Button icon='open folder' content='Open' />
          <Button icon='add' content='Add track here' />
        </Button.Group>
      </div>
    );
  }
}

export default Controls;
