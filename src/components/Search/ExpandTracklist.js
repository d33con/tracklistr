import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ExpandedReleaseDetails from "./ExpandedReleaseDetails";

class ExpandTracklist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      clicked: false
    };

    this.getReleaseDetails = this.getReleaseDetails.bind(this);
    this.addReleaseToTracklist = this.addReleaseToTracklist.bind(this);
  }

  getReleaseDetails() {
    axios
      .get("https://api.discogs.com/masters/" + this.props.releaseId, {
        params: {
          token: "OKAFGfTucaaBaUSmmLucyymiHxryMsQjXAhNaDzD"
        }
      })
      .then(result => {
        this.setState({ result });
        console.log(result);
      });
  }

  addReleaseToTracklist(result) {
    this.props.addReleaseToTracklist(result);
  }

  render() {
    return (
      <ExpandedReleaseDetails
        release={this.state.result}
        addReleaseToTracklist={() => this.addReleaseToTracklist()}
        clicked={this.state.clicked}
      />
    );
  }
}

ExpandTracklist.propTypes = {
  addReleaseToTracklist: PropTypes.func
};

export default ExpandTracklist;
