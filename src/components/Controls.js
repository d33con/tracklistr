import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import ProgressBar from './ProgressBar';
import AddTrackModal from './AddTrackModal';

import '../style/Controls.css';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioPlaying: false,
      duration: 0,
      currentTime: 0,
      addingTrack: false,
      addingTrackAtTime: 0,
      currentTracklist: props.currentTracklist,
    };
    this.toggleAudio = this.toggleAudio.bind(this);
    this.updateTrackPosition = this.updateTrackPosition.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addReleaseToTracklist = this.addReleaseToTracklist.bind(this);
  }

  state: {
    audioPlaying: boolean,
    duration: number,
    currentTime: number,
    addingTrack: boolean,
    addingTrackAtTime: number
  };

  componentDidMount() {
    this.audioSrc.addEventListener('loadedmetadata', (e) => {
      const duration = Math.floor(e.currentTarget.duration);
      this.setState({ duration });
    });
  }

  props: {
    currentTracklist: Array<Track>,
    addReleaseToTracklist: () => void
  };

  toggleAudio: () => void;
  updateTrackPosition: () => void;
  openModal: () => void;
  closeModal: () => void;
  addReleaseToTracklist: () => void;
  audio: () => void;
  audioSrc: () => void;

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

  openModal() {
    this.setState({
      addingTrack: true,
      addingTrackAtTime: this.state.currentTime,
    });
  }

  closeModal() {
    this.setState({
      addingTrack: false,
    });
  }

  addReleaseToTracklist(track: Array<Track>) {
    const trackTime: number = this.state.addingTrackAtTime;
    this.props.addReleaseToTracklist(track, trackTime);
    this.closeModal();
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
            onClick={this.openModal}
          />
          <AddTrackModal
            shown={this.state.addingTrack}
            onClose={this.closeModal}
            currentTime={this.state.addingTrackAtTime}
            addReleaseToTracklist={this.addReleaseToTracklist}
          />
        </div>
      </div>
    );
  }
}

export default Controls;
