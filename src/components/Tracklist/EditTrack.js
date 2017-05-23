import React, { Component } from "react";
import PropTypes from "prop-types";
import convertStringToTime from "../../HelperFunctions/ConvertStringToTime";
import convertTimeToString from "../../HelperFunctions/ConvertTimeToString";
import { Container, Header, Form } from "semantic-ui-react";
import TextInput from "../Form/TextInput";
//import TimeInput from "../Form/TimeInput";
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
    this.handleTimeChange = this.handleTimeChange.bind(this);
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

  handleTimeChange(e) {
    this.setState({ trackTime: convertStringToTime(e.target.value) });
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
    return (
      <Container>
        <Header as="h1" inverted>
          Edit Track at {convertTimeToString(trackTime)}
        </Header>
        <Form size="large" inverted>
          {/*<TimeInput
            label="Time"
            width={2}
            value={convertTimeToString(trackTime)}
            name="trackTime"
            onChange={this.handleTimeChange}
          />*/}
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
            innerLabel="www.discogs.com/"
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
