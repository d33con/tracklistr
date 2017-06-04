import React, { Component } from "react";
import PropTypes from "prop-types";
import v4 from "uuid";
import { Button, Icon, Table, Dimmer } from "semantic-ui-react";
import convertTimeToString from "../../HelperFunctions/ConvertTimeToString";

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
    this.updateTracklistTable = this.updateTracklistTable.bind(this);
    this.closeDimmer = this.closeDimmer.bind(this);
  }

  componentDidMount() {
    this.updateTracklistTable(this.props.currentTracklist);
  }

  componentWillReceiveProps(nextProps) {
    this.updateTracklistTable(nextProps.currentTracklist);
  }

  updateTracklistTable(newTracklist) {
    // **CHECK THIS!**
    const sortedTracklist = newTracklist.sort(
      (a, b) => (a.trackTime > b.trackTime ? 1 : -1)
    );
    this.setState({
      tracklist: sortedTracklist
    });
  }

  addTableTrack(e) {
    e.preventDefault();
    this.setState(prevState => ({
      tracklist: prevState.tracklist.concat({
        trackTime: 0,
        trackTitle: "",
        trackUrl: "",
        trackLabel: "",
        releaseId: v4()
      })
    }));
  }

  editTrack(id) {
    this.setState({
      showDimmer: true,
      editing: this.state.tracklist.find(track => track.releaseId === id)
    });
  }

  deleteTrack(id) {
    this.setState({
      tracklist: this.state.tracklist.filter(track => track.releaseId !== id)
    });
  }

  updateTrack(formPayload) {
    this.setState({
      tracklist: [
        ...this.state.tracklist.filter(
          tracks => tracks.releaseId !== formPayload.releaseId
        ),
        formPayload
      ]
    });
    this.closeDimmer();
    this.updateTracklistTable(); // **CHECK THIS!**
  }

  closeDimmer() {
    this.setState({ showDimmer: false });
  }

  render() {
    const { showDimmer, tracklist } = this.state;
    const tableRows = tracklist.map(track => (
      <Table.Row key={track.releaseId}>
        <Table.Cell>
          {convertTimeToString(track.trackTime)}
        </Table.Cell>
        <Table.Cell>
          <a href={`'https://www.discogs.com${track.trackUrl}'`}>
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
            onClick={() => this.editTrack(track.releaseId)}
          />
        </Table.Cell>
        <Table.Cell collapsing textAlign="center">
          <Icon
            name="delete"
            link
            color="red"
            onClick={() => this.deleteTrack(track.releaseId)}
          />
        </Table.Cell>
      </Table.Row>
    ));

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
              <Table.HeaderCell>
                Time
              </Table.HeaderCell>
              <Table.HeaderCell>
                Track Name
              </Table.HeaderCell>
              <Table.HeaderCell>
                Label
              </Table.HeaderCell>
              <Table.HeaderCell>
                Edit
              </Table.HeaderCell>
              <Table.HeaderCell>
                Delete
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tableRows}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
                <Button floated="right" color="blue" inverted animated>
                  <Button.Content hidden>Export</Button.Content>
                  <Button.Content visible>
                    <Icon name="file outline" />
                  </Button.Content>
                </Button>
                <Button floated="right" color="blue" inverted animated>
                  <Button.Content hidden>Share</Button.Content>
                  <Button.Content visible>
                    <Icon name="share" />
                  </Button.Content>
                </Button>
                <Button
                  size="medium"
                  color="blue"
                  inverted
                  animated
                  onClick={this.addTableTrack}
                >
                  <Button.Content hidden>Add</Button.Content>
                  <Button.Content visible>
                    <Icon name="add circle" />
                  </Button.Content>
                </Button>
                <Button size="medium" color="blue" inverted animated>
                  <Button.Content hidden>Save</Button.Content>
                  <Button.Content visible>
                    <Icon name="save" />
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
  currentTracklist: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TracklistTable;