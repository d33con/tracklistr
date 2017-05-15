// @flow
import React, { Component } from 'react';
import { Button, Icon, Table, Dimmer } from 'semantic-ui-react';

import EditTrack from './EditTrack';

class TracklistTable extends Component {
  addTableTrack: () => void;
  editTrack: () => void;
  deleteTrack: () => void;
  updateTrack: () => void;
  closeDimmer: () => void;
  constructor() {
    super();

    this.state = {
      tracks: [
        {
          trackTime: '0:00',
          trackTitle: 'Caroline K - Tracking With Close Ups',
          trackUrl: 'Caroline-K-Now-Wait-For-Last-Year/release/10182988',
          trackLabel: 'Blackest Ever Black',
          releaseId: 10182988,
        },
        {
          trackTime: '1:00',
          trackTitle: 'Foul Play - Being With You (Foul Play remix)',
          trackUrl: 'Foul-Play-Vol-4-Remixes-Part-I/release/125038',
          trackLabel: 'Moving Shadow',
          releaseId: 125038,
        },
      ],
      showDimmer: false,
      editing: [],
    };

    this.addTableTrack = this.addTableTrack.bind(this);
    this.editTrack = this.editTrack.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.updateTrack = this.updateTrack.bind(this);
    this.closeDimmer = this.closeDimmer.bind(this);
  }

  state: {
    tracks: Array<mixed> & {
      trackTime: string,
      trackTitle: string,
      trackUrl: string,
      trackLabel: string,
      releaseId: number
    },
    showDimmer: boolean,
    editing: Array<mixed>
  };

  addTableTrack(e: Object) {
    e.preventDefault();
    this.setState(prevState => ({
      tracks: prevState.tracks.concat({
        trackTime: '',
        trackTitle: '',
        trackUrl: '',
        trackLabel: '',
        releaseId: Date.now(),
      }),
    }));
  }

  editTrack(id: number) {
    this.setState({
      showDimmer: true,
      editing: this.state.tracks.find(tracks => tracks.releaseId === id),
    });
  }

  deleteTrack(id: number) {
    this.setState({
      tracks: this.state.tracks.filter(tracks => tracks.releaseId !== id),
    });
  }

  updateTrack(formPayload: Object) {
    console.log(formPayload);
    this.setState({
      tracks: [
        ...this.state.tracks.filter(
          tracks => tracks.releaseId !== formPayload.releaseId,
        ),
        formPayload,
      ],
    });
    console.log(this.state);
    this.closeDimmer();
  }

  closeDimmer() {
    this.setState({ showDimmer: false });
  }

  render() {
    const { showDimmer, tracks } = this.state;
    const tableRows = tracks.map(track => (
      <Table.Row key={track.releaseId}>
        <Table.Cell>
          {track.trackTime}
        </Table.Cell>
        <Table.Cell>
          <a href={`'https://www.discogs.com/${track.trackUrl}'`}>
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
            closeDimmer={this.closeDimmer}
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

export default TracklistTable;
