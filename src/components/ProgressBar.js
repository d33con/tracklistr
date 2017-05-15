import React, { Component } from 'react';
import '../style/ProgressBar.css';

class ProgressBar extends Component {
  getTrackPosition: () => void;
  convertTimesToString: () => void;
  progressBar: () => void;

  constructor(
    props: { duration: number, currentTime: number, handleClick: Function },
  ) {
    super(props);

    this.getTrackPosition = this.getTrackPosition.bind(this);
  }

  getTrackPosition(e: Object) {
    const elPosition = this.progressBar.getBoundingClientRect();
    const clickPoint =
      (e.clientX - elPosition.left) / e.currentTarget.offsetWidth;
    const clickPercent = clickPoint * this.props.duration;
    this.props.handleClick(clickPercent);
  }

  convertTimesToString(time: number) {
    const minsLeft = Math.floor(time / 60);
    const secsLeft = time % 60;
    return `${minsLeft}:${secsLeft < 10 ? '0' : ''}${secsLeft}`;
  }

  render() {
    let { currentTime, duration } = this.props;
    const percentCompleted = currentTime / duration * 100;
    const barStyle = {
      width: `${percentCompleted}%`,
    };
    currentTime = this.convertTimesToString(currentTime);
    duration = this.convertTimesToString(duration);

    return (
      <div
        className="b-progress"
        onClick={this.getTrackPosition}
        ref={progressBar => this.progressBar = progressBar}
      >
        <div className="b-progress-bar" style={barStyle} />
        <div className="b-progress-bar-label">
          <span>{currentTime} / {duration}</span>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
