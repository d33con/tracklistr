import React, { Component } from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";

import { Button, Icon, Input, Popup } from "semantic-ui-react";
import Dropzone from "react-dropzone";

import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import AddTrackModal from "./AddTrackModal";
import audioSrc from "../../audio/DJ Advance - 93-4 Darkside Mini Mix.mp3";

import "../../style/Controls.css";

@inject("store")
@observer
class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioSrc,
      currentTracklist: props.currentTracklist
    };
    this.store = this.props.store;
    this.muteAudio = this.muteAudio.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.loadAudio = this.loadAudio.bind(this);
    this.updateAudioSrc = this.updateAudioSrc.bind(this);
    this.loadAudioFromUrl = this.loadAudioFromUrl.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.updateTrackPosition = this.updateTrackPosition.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addReleaseToTracklist = this.addReleaseToTracklist.bind(this);
  }

  @observable duration = 0;
  @observable audioPlaying = false;
  @observable currentTime = 0;
  @observable isAudioLoadPopupOpen = false;
  @observable volume = 1;
  @observable addingTrack = false;
  @observable addingTrackAtTime = 0;

  componentDidMount() {
    this.audioSrc.addEventListener("durationchange", e => {
      const duration = Math.floor(e.currentTarget.duration);
      this.duration = duration;
    });
  }

  loadAudio(file) {
    this.setState({ audioSrc: file[0].preview }, () => this.toggleAudio());
    this.store.initialiseTracklist();
  }

  toggleAudio() {
    this.audioPlaying = !this.audioPlaying;
    this.audioSrc.addEventListener("timeupdate", e => {
      const currentTime = Math.floor(e.currentTarget.currentTime);
      this.currentTime = currentTime;
    });
    this.audioSrc.addEventListener("ended", () => {
      this.audioPlaying = false;
      this.currentTime = 0;
    });
    return this.audioPlaying ? this.audioSrc.play() : this.audioSrc.pause();
  }

  openPopup(e) {
    e.preventDefault();
    this.isAudioLoadPopupOpen = true;
  }

  closePopup(e) {
    e.preventDefault();
    this.isAudioLoadPopupOpen = false;
  }

  updateAudioSrc(e) {
    this.setState({ audioSrc: e.target.value });
  }

  loadAudioFromUrl(e) {
    e.preventDefault();
    this.isAudioLoadPopupOpen = false;
    this.toggleAudio();
    this.store.initialiseTracklist();
  }

  updateTrackPosition(percent) {
    const currentTime = Math.floor(this.duration * (percent / 100));
    this.currentTime = currentTime;
    this.audioSrc.currentTime = currentTime;
  }

  openModal() {
    this.addingTrack = true;
    this.addingTrackAtTime = this.currentTime;
  }

  closeModal() {
    this.addingTrack = false;
  }

  addReleaseToTracklist(track) {
    const trackTime = this.addingTrackAtTime;
    this.store.addReleaseToTracklist(track, trackTime);
    this.closeModal();
  }

  setVolume(volume) {
    if (volume > 0 && volume <= 1) {
      this.audioSrc.volume = volume;
      this.volume = volume;
    }
  }

  muteAudio() {
    this.volume = 0;
    this.setVolume(0);
    return this.audioSrc.muted;
  }

  render() {
    const dropzoneStyle = {
      style: "none"
    };

    const { audioSrc } = this.state;

    return (
      <div className="b-audio-player-controls">
        <audio
          ref={audio => (this.audioSrc = audio)}
          className="audio-player--file"
          src={audioSrc}
        />
        <VolumeControl
          setVolume={this.setVolume}
          muteAudio={this.muteAudio}
          volume={this.volume}
        />
        <ProgressBar
          handleClick={this.updateTrackPosition}
          duration={this.duration}
          currentTime={this.currentTime}
        />
        <Button.Group labeled>
          {this.audioPlaying ? (
            <Button
              icon="pause"
              content="Pause"
              size="large"
              onClick={this.toggleAudio}
              color="yellow"
            />
          ) : (
            <Button
              icon="play"
              content="Play"
              size="large"
              onClick={this.toggleAudio}
              color="blue"
            />
          )}
          <Button size="large">
            <Dropzone
              style={dropzoneStyle}
              accept="audio/*"
              multiple={false}
              onDrop={this.loadAudio}
            >
              <Icon name="open folder" />File
            </Dropzone>
          </Button>
          <Popup
            trigger={
              <Button size="large">
                <Icon name="world" />
                URL
              </Button>
            }
            on="click"
            position="right center"
            open={this.isAudioLoadPopupOpen}
            onOpen={this.openPopup}
            onClose={this.closePopup}
          >
            <Popup.Content>
              <Input
                placeholder="Enter URL"
                autoFocus
                onChange={this.updateAudioSrc}
                icon={
                  <Icon
                    name="add"
                    onClick={this.loadAudioFromUrl}
                    link
                    circular
                    inverted
                    color="teal"
                  />
                }
              />
            </Popup.Content>
          </Popup>
        </Button.Group>
        <div className="b-add-track">
          <Button
            icon="add"
            color="green"
            size="large"
            inverted
            content="Add track using Discogs at current time"
            onClick={this.openModal}
          />
          <AddTrackModal
            shown={this.addingTrack}
            onClose={this.closeModal}
            currentTime={this.addingTrackAtTime}
            addReleaseToTracklist={this.addReleaseToTracklist}
          />
        </div>
      </div>
    );
  }
}
export default Controls;
