import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import "../../style/VolumeControl.css";

class VolumeControl extends Component {
  static propTypes = {
    setVolume: PropTypes.func.isRequired,
    muteAudio: PropTypes.func.isRequired,
    volume: PropTypes.number.isRequired
  };

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
      <div className="volume-bar__container">
        <div className="volume-bar__icon">
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
          className="volume-bar__background"
          onMouseMove={this.setVolumeByDrag}
          onClick={this.setVolumeByClick}
          onMouseDown={this.onMouseDown}
          ref={volumeBar => (this.volumeBar = volumeBar)}
        >
          <span className="volume-bar__filled" style={barStyle} />
        </div>
      </div>
    );
  }
}

export default VolumeControl;
