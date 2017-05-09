import React, { Component } from 'react';
import { Button, Icon, Table, Dimmer } from 'semantic-ui-react';

class TracklistTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: [
        {
          trackTime: '0.00',
          trackTitle: 'Caroline K - Tracking With Close Ups',
          trackUrl: 'Caroline-K-Now-Wait-For-Last-Year/release/10182988',
          releaseId: '10182988',
          label: 'Blackest Ever Black'
        },
        {
          trackTime: '1.00',
          trackTitle: 'Foul Play - Being With You (Foul Play remix)',
          trackUrl: 'Foul-Play-Vol-4-Remixes-Part-I/release/125038',
          releaseId: '125038',
          label: 'Moving Shadow'
        }
      ],
      showDimmer: false
    };

    this.addTabletrack = this.addTabletrack.bind(this);
    this.editTrack = this.editTrack.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.closeDimmer = this.closeDimmer.bind(this);
  }

  addTabletrack(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      tracks: prevState.tracks.concat({
        trackTime: '',
        trackTitle: '',
        trackUrl: '',
        releaseId: Date.now()
      })
    }));
  }

  editTrack() {
    this.setState({ showDimmer: true });
    console.log(this.props.children);
  }

  deleteTrack(id) {
    console.log(id);
    this.setState({
      tracks: this.state.tracks.filter(tracks => tracks.releaseId !== id)
    });
  }

  closeDimmer() {
    this.setState({ showDimmer: false });
  }

  render() {
    const tableRows = this.state.tracks.map(track => {
      return (
        <Table.Row key={track.releaseId}>
          <Table.Cell>
            {track.trackTime}
          </Table.Cell>
          <Table.Cell>
            <a href={`'https://www.discogs.com/${track.trackUrl}'`}>{track.trackTitle}</a>
          </Table.Cell>
          <Table.Cell>
            {track.label}
          </Table.Cell>
          <Table.Cell collapsing textAlign='center'>
            <Icon name='edit' link onClick={this.editTrack} />
          </Table.Cell>
          <Table.Cell collapsing textAlign='center'>
            <Icon name='delete' link color='red' onClick={() => this.deleteTrack(track.releaseId)} />
          </Table.Cell>
        </Table.Row>
      );
    });

    const { showDimmer } = this.state;
    const content = (
      <div>
        <h2>Edit Track</h2>
      </div>
    );

    return (
      <Dimmer.Dimmable 
        dimmed={showDimmer}>
        <Dimmer active={showDimmer} onClickOutside={this.closeDimmer} page >
          {content}
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
              <Table.HeaderCell colSpan='5'>
                <Button floated='right' color='blue' inverted animated>
                  <Button.Content hidden>Export</Button.Content>
                  <Button.Content visible>
                    <Icon name='file outline' />
                  </Button.Content>
                </Button>
                <Button floated='right' color='blue' inverted animated>
                  <Button.Content hidden>Share</Button.Content>
                  <Button.Content visible>
                    <Icon name='share' />
                  </Button.Content>
                </Button>
                <Button size='medium' color='blue' inverted animated onClick={this.addTabletrack}>
                  <Button.Content hidden>Add</Button.Content>
                  <Button.Content visible>
                    <Icon name='add circle' />
                  </Button.Content>
                </Button>
                <Button size='medium' color='blue' inverted animated>
                  <Button.Content hidden>Save</Button.Content>
                  <Button.Content visible>
                    <Icon name='save' />
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