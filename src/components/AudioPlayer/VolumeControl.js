import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import "../../style/VolumeControl.css";

class VolumeControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseDown: false,
      isMouseInsideBar: false,
      volume: 100,
      isMuted: false
    };

    this.setVolume = this.setVolume.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.muteVolume = this.muteVolume.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  muteVolume() {
    if (!this.state.isMuted) {
      return this.setState(
        {
          volume: 0,
          isMuted: true
        },
        () => this.props.setVolume(this.state.volume)
      );
    }
    return this.setState(
      {
        volume: this.state.volume,
        isMuted: false
      },
      () => this.props.setVolume(this.state.volume)
    );
  }

  onMouseDown() {
    this.setState({
      isMouseDown: true
    });
  }

  onMouseUp() {
    this.setState({
      isMouseDown: false
    });
  }

  handleClick(clickPercent) {
    console.log(clickPercent);
    this.state.isMouseDown &&
      this.setState({
        volume: clickPercent
      });
  }

  setVolume(e) {
    const elPosition = this.volumeBar.getBoundingClientRect();
    const clickPoint =
      (e.clientX - elPosition.left) / e.currentTarget.offsetWidth;
    const clickPercent =
      clickPoint * this.state.volume / this.state.volume * 100;
    this.state.isMouseDown &&
      this.setState(
        {
          volume: clickPercent
        },
        () => this.props.setVolume(clickPercent)
      );
  }

  render() {
    const barWidth = this.state.volume;
    const barStyle = {
      width: `${barWidth}%`
    };

    return (
      <div className="b-volume-bar-container">
        <div className="b-volume-bar-icon">
          {barWidth === 0
            ? <Icon.Group onClick={this.muteVolume} color="grey" size="large">
                <Icon name="volume off" />
                <Icon corner name="cancel" color="red" />
              </Icon.Group>
            : <Icon
                name="volume up"
                onClick={this.muteVolume}
                color="blue"
                size="large"
              />}
        </div>
        <div
          className="b-volume-bar-background"
          onMouseMove={this.setVolume}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          ref={volumeBar => (this.volumeBar = volumeBar)}
        >
          <span className="b-volume-bar-filled" style={barStyle}>
            <span
              className="b-volume-bar-knob"
              onMouseMove={this.setVolume}
              onMouseDown={this.onMouseDown}
              onMouseUp={this.onMouseUp}
              style={{ left: `${barWidth}%` }}
            />
          </span>
        </div>
      </div>
    );
  }
}

VolumeControl.propTypes = {
  setVolume: PropTypes.func.isRequired
};

export default VolumeControl;
