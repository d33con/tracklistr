import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";
import Dropzone from "react-dropzone";

import ProgressBar from "./ProgressBar";
import AddTrackModal from "./AddTrackModal";
import audioSrc from "../../audio/DJ Advance - 93-4 Darkside Mini Mix.mp3";

import "../../style/Controls.css";

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioPlaying: false,
      audioSrc,
      duration: 0,
      currentTime: 0,
      addingTrack: false,
      addingTrackAtTime: 0,
      currentTracklist: props.currentTracklist
    };
    this.toggleAudio = this.toggleAudio.bind(this);
    this.loadAudio = this.loadAudio.bind(this);
    this.updateTrackPosition = this.updateTrackPosition.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addReleaseToTracklist = this.addReleaseToTracklist.bind(this);
  }

  componentDidMount() {
    this.audioSrc.addEventListener("durationchange", e => {
      const duration = Math.floor(e.currentTarget.duration);
      this.setState({ duration });
    });
  }

  loadAudio(file) {
    this.setState({
      audioSrc: file[0].preview
    });
  }

  toggleAudio() {
    this.setState(prevState => ({ audioPlaying: !prevState.audioPlaying }));
    this.audioSrc.addEventListener("timeupdate", e => {
      const currentTime = Math.floor(e.currentTarget.currentTime);
      this.setState({ currentTime });
    });
    this.audioSrc.addEventListener("ended", () => {
      this.setState({
        audioPlaying: false,
        currentTime: 0
      });
    });
    return this.state.audioPlaying
      ? this.audioSrc.pause()
      : this.audioSrc.play();
  }

  updateTrackPosition(percent) {
    const currentTime = Math.floor(this.state.duration * (percent / 100));
    this.setState({ currentTime });
    this.audioSrc.currentTime = currentTime;
  }

  openModal() {
    this.setState({
      addingTrack: true,
      addingTrackAtTime: this.state.currentTime
    });
  }

  closeModal() {
    this.setState({
      addingTrack: false
    });
  }

  addReleaseToTracklist(track) {
    const trackTime = this.state.addingTrackAtTime;
    this.props.addReleaseToTracklist(track, trackTime);
    this.closeModal();
  }

  render() {
    const dropzoneStyle = {
      style: "none"
    };

    return (
      <div className="b-audio-player-controls">
        <audio
          ref={audio => this.audioSrc = audio}
          className="audio-player--file"
          src={this.state.audioSrc}
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
          <Button size="large">
            <Dropzone
              style={dropzoneStyle}
              accept="audio/*"
              multiple={false}
              onDrop={this.loadAudio}
            >
              <Icon name="open folder" />Open
            </Dropzone>
          </Button>
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

Controls.propTypes = {
  currentTracklist: PropTypes.arrayOf(PropTypes.object).isRequired,
  addReleaseToTracklist: PropTypes.func.isRequired
};

export default Controls;
