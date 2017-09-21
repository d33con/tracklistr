import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import "../../style/VolumeControl.css";

class VolumeControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseDown: false,
      volume: props.volume,
      isMuted: false
    };

    this.setVolumeByDrag = this.setVolumeByDrag.bind(this);
    this.setVolumeByClick = this.setVolumeByClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.muteVolume = this.muteVolume.bind(this);
    this.unMuteVolume = this.unMuteVolume.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  muteVolume() {
    this.setState(
      prevState => ({
        isMuted: !prevState.isMuted,
        volume: 0
      }),
      () => this.props.muteAudio()
    );
  }

  unMuteVolume() {
    this.setState(
      prevState => ({
        isMuted: !prevState.isMuted,
        volume: 1
      }),
      () => this.props.setVolume(1)
    );
  }
  onMouseDown(e) {
    this.setState({
      isMouseDown: true
    });
  }

  handleMouseUp(e) {
    this.setState({
      isMouseDown: false
    });
  }

  setVolumeByDrag(e) {
    const elPosition = this.volumeBar.getBoundingClientRect();
    const clickPoint =
      (e.clientX - elPosition.left) / e.currentTarget.offsetWidth;
    if (this.state.isMouseDown) {
      this.setState(
        {
          volume: clickPoint
        },
        () => this.props.setVolume(clickPoint)
      );
    }
    return false;
  }

  setVolumeByClick(e) {
    const elPosition = this.volumeBar.getBoundingClientRect();
    const clickPoint =
      (e.clientX - elPosition.left) / e.currentTarget.offsetWidth;
    this.setState(
      {
        volume: clickPoint
      },
      () => this.props.setVolume(clickPoint)
    );
    return false;
  }
  render() {
    const { volume, isMuted } = this.state;

    const barStyle = {
      width: `${volume * 100}%`
    };

    return (
      <div className="b-volume-bar-container">
        <div className="b-volume-bar-icon">
          {isMuted ? (
            <Icon.Group onClick={this.unMuteVolume} color="grey" size="large">
              <Icon name="volume off" />
              <Icon corner name="cancel" color="red" />
            </Icon.Group>
          ) : (
            <Icon
              name="volume up"
              onClick={this.muteVolume}
              color="blue"
              size="large"
            />
          )}
        </div>
        <div
          className="b-volume-bar-background"
          onMouseMove={this.setVolumeByDrag}
          onClick={this.setVolumeByClick}
          onMouseDown={this.onMouseDown}
          ref={volumeBar => (this.volumeBar = volumeBar)}
        >
          <span className="b-volume-bar-filled" style={barStyle} />
        </div>
      </div>
    );
  }
}

VolumeControl.propTypes = {
  setVolume: PropTypes.func.isRequired,
  muteAudio: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired
};

export default VolumeControl;
