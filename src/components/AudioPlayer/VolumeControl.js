import React, { Component } from "react";
//import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import "../../style/VolumeControl.css";

class VolumeControl extends Component {
  constructor() {
    super();
    this.state = {
      isMouseDown: false,
      isMouseInsideBar: false,
      volume: 100,
      muted: false
    };

    this.setVolume = this.setVolume.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onBarClick = this.onBarClick.bind(this);
    this.toggleVolume = this.toggleVolume.bind(this);
  }

  toggleVolume() {
    if (this.state.volume === 100) {
      return this.setState({
        volume: 0,
        muted: true
      });
    }
    return this.setState({
      volume: 100,
      muted: false
    });
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

  onMouseLeave() {
    this.state.isMouseDown &&
      this.setState({
        isMouseDown: false
      });
  }

  onBarClick(e) {
    !this.state.isMouseDown &&
      this.setState(
        {
          isMouseDown: true
        },
        this.setVolume(e)
      );
    console.log(e.clientX);
    this.setState({
      isMouseDown: false
    });
  }

  setVolume(e) {
    const elPosition = this.volumeBar.getBoundingClientRect();
    const clickPoint =
      (e.clientX - elPosition.left) / e.currentTarget.offsetWidth;
    const clickPercent =
      clickPoint * this.state.volume / this.state.volume * 100;
    //this.props.handleClick(clickPercent);
    this.state.isMouseDown &&
      this.setState({
        volume: clickPercent
      });
  }

  render() {
    //let { currentTime, duration } = this.props;
    const percentCompleted = this.state.volume;
    const barStyle = {
      width: `${percentCompleted}%`
    };

    return (
      <div className="b-volume-bar-container">
        <div
          className="b-volume-bar-background"
          onMouseMove={this.setVolume}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseLeave}
          onClick={this.onBarClick}
          ref={volumeBar => (this.volumeBar = volumeBar)}
        >
          <div className="b-volume-bar-filled" style={barStyle}>
            <div
              className={
                this.state.muted
                  ? "b-volume-bar-knob--muted"
                  : "b-volume-bar-knob"
              }
              onMouseMove={this.setVolume}
              onMouseDown={this.onMouseDown}
              onMouseUp={this.onMouseUp}
              onClick={this.onBarClick}
            />
          </div>
        </div>
        <div className="b-volume-bar-icon">
          {this.state.muted
            ? <Icon.Group onClick={this.toggleVolume} color="grey" size="large">
                <Icon name="volume off" />
                <Icon corner name="cancel" color="red" />
              </Icon.Group>
            : <Icon
                name="volume up"
                onClick={this.toggleVolume}
                color="blue"
                size="large"
              />}
        </div>
      </div>
    );
  }
}

//VolumeControl.propTypes = {};

export default VolumeControl;
