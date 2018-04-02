import React, { Component } from "react";
import PropTypes from "prop-types";
import convertTimeToString from "../../HelperFunctions/ConvertTimeToString";
import { Container, Header, Icon, Form } from "semantic-ui-react";
import TextInput from "../Form/TextInput";
import TimeInput from "../Form/TimeInput";
import "../../style/EditTrack.css";

class EditTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackTime: 0,
      trackTitle: "",
      trackLabel: "",
      trackUrl: "",
      releaseId: ""
    };
    this.handleMinutesIncrease = this.handleMinutesIncrease.bind(this);
    this.handleMinutesDecrease = this.handleMinutesDecrease.bind(this);
    this.handleSecondsIncrease = this.handleSecondsIncrease.bind(this);
    this.handleSecondsDecrease = this.handleSecondsDecrease.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const {
      trackTime,
      trackTitle,
      trackLabel,
      trackUrl,
      releaseId
    } = this.props.track;
    this.setState({
      trackTime,
      trackTitle,
      trackLabel,
      trackUrl,
      releaseId
    });
  }

  handleMinutesIncrease(e) {
    this.setState(prevState => ({
      trackTime: prevState.trackTime + 60
    }));
  }

  handleMinutesDecrease(e) {
    this.setState(prevState => ({
      trackTime: prevState.trackTime - 60
    }));
  }

  handleSecondsIncrease(e) {
    this.setState(prevState => ({
      trackTime: prevState.trackTime + 1
    }));
  }

  handleSecondsDecrease(e) {
    this.setState(prevState => ({
      trackTime: prevState.trackTime - 1
    }));
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.updateTrack({ ...this.state });
  }

  render() {
    const { trackTime, trackTitle, trackUrl, trackLabel } = this.state;
    const minutes = Math.floor(trackTime / 60);
    let seconds = trackTime % 60;
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return (
      <Container>
        <Header as="h1" inverted>
          Edit Track at {convertTimeToString(trackTime)}
        </Header>
        <Form size="large" inverted>
          <Form.Group inline>
            <label>Time: </label>
            <TimeInput label="Mins" value={minutes} />
            <div className="editform-timebuttons">
              <Icon
                name="plus square outline"
                size="large"
                onClick={this.handleMinutesIncrease}
              />
              <Icon
                name="minus square outline"
                size="large"
                onClick={this.handleMinutesDecrease}
              />
            </div>
            <TimeInput label="Secs" value={seconds} />
            <div className="editform-timebuttons">
              <Icon
                name="plus square outline"
                size="large"
                onClick={this.handleSecondsIncrease}
              />
              <Icon
                name="minus square outline"
                size="large"
                onClick={this.handleSecondsDecrease}
              />
            </div>
          </Form.Group>
          <TextInput
            label="Title"
            value={trackTitle}
            name="trackTitle"
            onChange={this.handleInputChange}
          />
          <TextInput
            label="Label"
            value={trackLabel}
            name="trackLabel"
            onChange={this.handleInputChange}
          />
          <TextInput
            label="Track Link"
            value={trackUrl}
            name="trackUrl"
            onChange={this.handleInputChange}
          />
          <Form.Button
            color="green"
            size="large"
            onClick={this.handleFormSubmit}
          >
            Save
          </Form.Button>
        </Form>
      </Container>
    );
  }
}

EditTrack.propTypes = {
  track: PropTypes.object.isRequired,
  updateTrack: PropTypes.func.isRequired
};

export default EditTrack;
