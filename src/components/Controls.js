// @flow
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import ProgressBar from './ProgressBar';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioPlaying: false,
      duration: 0,
      currentTime: 0,
    };
    this.toggleAudio = this.toggleAudio.bind(this);
    this.updateTrackPosition = this.updateTrackPosition.bind(this);
  }

  componentDidMount() {
    this.audioSrc.addEventListener('loadedmetadata', (e) => {
      const duration = Math.floor(e.currentTarget.duration);
      this.setState({ duration });
    });
  }

  toggleAudio() {
    this.setState(prevState => ({ audioPlaying: !prevState.audioPlaying }));
    this.state.audioPlaying ? this.audioSrc.pause() : this.audioSrc.play();
    this.audioSrc.addEventListener('timeupdate', (e) => {
      const currentTime = Math.floor(e.currentTarget.currentTime);
      this.setState({ currentTime });
    });
    this.audioSrc.addEventListener('ended', () => {
      this.setState({
        audioPlaying: false,
        currentTime: 0,
      });
    });
  }

  updateTrackPosition(percent) {
    const currentTime = Math.floor(this.state.duration * (percent / 100));
    this.setState({ currentTime });
    this.audioSrc.currentTime = currentTime;
  }

  render() {
    return (
      <div className="audio-player-controls">
        <audio
          ref={audio => this.audioSrc = audio}
          className="audio-player--file"
          src="http://5b9ae60eaaf6858489d5-de7a668058c1db97713a59708a969f8c.r44.cf3.rackcdn.com/fresh86171a1.mp3"
        />
        <ProgressBar
          handleClick={this.updateTrackPosition}
          duration={this.state.duration}
          currentTime={this.state.currentTime}
        />
        <Button.Group labeled>
          {this.state.audioPlaying
            ? <Button icon="pause" content="Pause" onClick={this.toggleAudio} />
            : <Button icon="play" content="Play" onClick={this.toggleAudio} />}
          <Button icon="open folder" content="Open" />
          <Button icon="add" content="Add track here" />
        </Button.Group>
      </div>
    );
  }
}

export default Controls;
