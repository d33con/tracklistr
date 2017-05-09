import React, { Component } from 'react';

import '../style/ProgressBar.css';

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.getTrackPosition = this.getTrackPosition.bind(this);
    this.convertTimesToString = this.convertTimesToString.bind(this);
  } 

  convertTimesToString(time) {
  const minsLeft = Math.floor(time / 60);
  const secsLeft = time % 60;
  return `${minsLeft}:${secsLeft < 10 ? '0' : ''}${secsLeft}`;
  } 

  getTrackPosition(e) {
    const el = this.refs.progress;
    const elPosition = el.getBoundingClientRect();
    const clickPoint = (e.clientX - elPosition.left) / e.currentTarget.offsetWidth;
    const clickPercent = clickPoint * this.props.duration;
    this.props.handleClick(clickPercent);
  }
  
  render() {
    let { currentTime, duration } = this.props;
    const percentCompleted = currentTime / duration * 100;
    const barStyle = {
      width: `${percentCompleted}%`
    }
    currentTime = this.convertTimesToString(currentTime);
    duration = this.convertTimesToString(duration);

    return (
      <div className="b-progress" onClick={this.getTrackPosition} ref="progress">
        <div className="b-progress-bar" style={barStyle}></div>
        <div className="b-progress-bar-label" >
          <span>{currentTime} / {duration}</span>        
        </div>
      </div>
    );
  }
}

export default ProgressBar;