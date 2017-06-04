import React, { Component } from "react";
import PropTypes from "prop-types";
import convertTimeToString from "../../HelperFunctions/ConvertTimeToString";
import { Container, Header, Form } from "semantic-ui-react";
import TextInput from "../Form/TextInput";
import TimeInput from "../Form/TimeInput";
import LabeledInput from "../Form/LabeledInput";

class EditTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackTime: 0,
      trackTitle: "",
      trackLabel: "",
      trackUrl: "",
      releaseId: 0
    };
    this.handleMinutesChange = this.handleMinutesChange.bind(this);
    this.handleSecondsChange = this.handleSecondsChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleTrackUrlChange = this.handleTrackUrlChange.bind(this);
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

  handleMinutesChange(e) {
    this.setState(prevState => ({
      trackTime: prevState.trackTime + 60
    }));
  }

  handleSecondsChange(e) {
    this.setState(prevState => ({
      trackTime: prevState.trackTime + 1
    }));
  }

  handleTitleChange(e) {
    this.setState({ trackTitle: e.target.value });
  }

  handleLabelChange(e) {
    this.setState({ trackLabel: e.target.value });
  }

  handleTrackUrlChange(e) {
    this.setState({ trackUrl: e.target.value });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const formPayload = {
      trackTime: this.state.trackTime,
      trackTitle: this.state.trackTitle,
      trackLabel: this.state.trackLabel,
      trackUrl: this.state.trackUrl,
      releaseId: this.state.releaseId
    };
    this.props.updateTrack(formPayload);
  }

  render() {
    const { trackTime, trackTitle, trackUrl, trackLabel } = this.state;
    const minutes = Math.floor(trackTime / 60);
    const seconds = trackTime % 60;

    return (
      <Container>
        <Header as="h1" inverted>
          Edit Track at {convertTimeToString(trackTime)}
        </Header>
        <Form size="large" inverted>
          <Form.Group inline widths="equal">
            <label>Time: </label>
            <TimeInput
              label="Mins"
              value={minutes}
              name={name}
              type="number"
              step="1"
              min="0"
              width={1}
              onChange={this.handleMinutesChange}
            />
            <TimeInput
              label="Secs"
              value={seconds}
              name={name}
              type="number"
              step="1"
              min="0"
              max="59"
              onChange={this.handleSecondsChange}
              width={1}
            />
          </Form.Group>
          <TextInput
            label="Title"
            value={trackTitle}
            name="trackTitle"
            onChange={this.handleTitleChange}
          />
          <TextInput
            label="Label"
            value={trackLabel}
            name="label"
            onChange={this.handleLabelChange}
          />
          <LabeledInput
            label="Track Link"
            innerLabel="www.discogs.com"
            value={trackUrl}
            name="trackUrl"
            onChange={this.handleTrackUrlChange}
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
  updateTrack: PropTypes.func
};

export default EditTrack;
