import React, { Component } from 'react';
import PropTypes from 'prop-types';
import convertTimesToString from '../../HelperFunctions/ConvertTimesToString';
import '../../style/ProgressBar.css';

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.getTrackPosition = this.getTrackPosition.bind(this);
  }

  getTrackPosition(e) {
    const elPosition = this.progressBar.getBoundingClientRect();
    const clickPoint =
      (e.clientX - elPosition.left) / e.currentTarget.offsetWidth;
    const clickPercent = clickPoint * this.props.duration;
    this.props.handleClick(clickPercent);
  }

  render() {
    let { currentTime, duration } = this.props;
    const percentCompleted = currentTime / duration * 100;
    const barStyle = {
      width: `${percentCompleted}%`,
    };
    currentTime = convertTimesToString(currentTime);
    duration = convertTimesToString(duration);

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

ProgressBar.propTypes = {
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ProgressBar;
