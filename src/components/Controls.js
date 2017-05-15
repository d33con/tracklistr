import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import ProgressBar from './ProgressBar';
import AddTrackModal from './AddTrackModal';

import '../style/Controls.css';

class Controls extends Component {
  toggleAudio: () => void;
  handleModalClick: () => void;
  updateTrackPosition: () => void;
  audio: () => void;
  audioSrc: () => void;

  constructor() {
    super();
    this.state = {
      audioPlaying: false,
      duration: 0,
      currentTime: 0,
      addingTrack: false,
      addingTrackAtTime: 0,
    };
    this.toggleAudio = this.toggleAudio.bind(this);
    this.updateTrackPosition = this.updateTrackPosition.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  state: {
    audioPlaying: boolean,
    duration: number,
    currentTime: number,
    addingTrack: boolean
  };

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

  updateTrackPosition(percent: number) {
    const currentTime = Math.floor(this.state.duration * (percent / 100));
    this.setState({ currentTime });
    this.audioSrc.currentTime = currentTime;
  }

  handleModalClick() {
    this.setState({
      addingTrack: !this.state.addingTrack,
      addingTrackAtTime: this.state.currentTime,
    });
  }

  render() {
    return (
      <div className="b-audio-player-controls">
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
            ? <Button
              icon="pause"
              content="Pause"
              size="large"
              onClick={this.toggleAudio}
            />
            : <Button
              icon="play"
              content="Play"
              size="large"
              onClick={this.toggleAudio}
            />}
          <Button icon="open folder" content="Open" size="large" />
        </Button.Group>
        <div className="b-add-track">
          <Button
            icon="add"
            color="green"
            size="large"
            inverted
            content="Add track at current timestamp"
            onClick={this.handleModalClick}
          />
          <AddTrackModal
            shown={this.state.addingTrack}
            onClose={this.handleModalClick}
            currentTime={this.state.addingTrackAtTime}
          />
        </div>
      </div>
    );
  }
}

export default Controls;
