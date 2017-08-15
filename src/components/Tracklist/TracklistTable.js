import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Icon, Table, Dimmer } from "semantic-ui-react";
import convertTimeToString from "../../HelperFunctions/ConvertTimeToString";
import * as FileSaver from "file-saver";

import EditTrack from "./EditTrack";

class TracklistTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracklist: [],
      showDimmer: false,
      editing: {}
    };

    this.addTableTrack = this.addTableTrack.bind(this);
    this.editTrack = this.editTrack.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.updateTrack = this.updateTrack.bind(this);
    this.saveToFile = this.saveToFile.bind(this);
  }

  componentDidMount() {
    //this.updateTracklistTable(this.props.tracklist);

    this.setState({
      tracklist: this.props.tracklist
    });
  }

  componentWillReceiveProps(nextProps) {
    //this.updateTracklistTable(nextProps.tracklist);
    this.state.tracklist !== nextProps.tracklist
      ? this.setState({
          tracklist: nextProps.tracklist
        })
      : this.setState({
          tracklist: this.props.tracklist
        });
  }

  addTableTrack(e) {
    e.preventDefault();
    this.props.addEmptyTrack();
  }

  editTrack(id) {
    this.setState({
      showDimmer: true,
      editing: this.state.tracklist.find(track => track.releaseId === id)
    });
  }

  deleteTrack(id) {
    this.props.deleteTrack(id);
  }

  updateTrack(formPayload) {
    this.setState({
      showDimmer: false
    });
    this.props.editTrack(formPayload);
  }

  // check
  saveToFile() {
    const tracklist = this.state.tracklist.map(track => {
      const timestamp = convertTimeToString(track.trackTime);
      return `${timestamp} - ${track.trackTitle} - ${track.trackLabel}`;
    });
    const blob = new Blob([tracklist.join("\r\n")], {
      type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(blob, `${this.props.mixTitle}.txt`);
  }

  render() {
    const { showDimmer } = this.state;
    const { tracklist } = this.props;
    const tableRows = tracklist.map(track =>
      <Table.Row key={track.releaseId}>
        <Table.Cell>
          {convertTimeToString(track.trackTime)}
        </Table.Cell>
        <Table.Cell>
          <a href={track.trackUrl}>
            {track.trackTitle}
          </a>
        </Table.Cell>
        <Table.Cell>
          {track.trackLabel}
        </Table.Cell>
        <Table.Cell collapsing textAlign="center">
          <Icon
            name="edit"
            link
            size="large"
            onClick={() => this.editTrack(track.releaseId)}
          />
        </Table.Cell>
        <Table.Cell collapsing textAlign="center">
          <Icon
            name="delete"
            link
            color="red"
            size="large"
            onClick={() => this.deleteTrack(track.releaseId)}
          />
        </Table.Cell>
      </Table.Row>
    );

    return (
      <Dimmer.Dimmable dimmed={showDimmer}>
        <Dimmer page active={showDimmer} onClickOutside={this.closeDimmer}>
          <EditTrack
            track={this.state.editing}
            updateTrack={this.updateTrack}
          />
        </Dimmer>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Track Name</Table.HeaderCell>
              <Table.HeaderCell>Label</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tableRows}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
                <Button
                  floated="right"
                  size="large"
                  color="blue"
                  inverted
                  animated="fade"
                  onClick={this.saveToFile}
                >
                  <Button.Content hidden>Export</Button.Content>
                  <Button.Content visible>
                    <Icon name="file outline" />
                  </Button.Content>
                </Button>
                <Button
                  size="large"
                  color="blue"
                  inverted
                  animated="fade"
                  onClick={this.addTableTrack}
                >
                  <Button.Content hidden>Add Row</Button.Content>
                  <Button.Content visible>
                    <Icon name="add circle" />
                  </Button.Content>
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Dimmer.Dimmable>
    );
  }
}

TracklistTable.propTypes = {
  tracklist: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TracklistTable;
