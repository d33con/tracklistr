import React, { Component } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';

class TracklistTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableRows: [
        {
          trackTime: '0.00',
          trackTitle: 'Caroline K - Tracking With Close Ups',
          trackUrl: 'Caroline-K-Now-Wait-For-Last-Year/release/10182988',
          releaseId: '10182988'
        }
      ]
    };

    this.addTableRow = this.addTableRow.bind(this);
  }

  addTableRow(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      tableRows: prevState.tableRows.concat({
        trackTime: '',
        trackTitle: '',
        trackUrl: '',
        releaseId: Date.now()
      })
    }));
  }

  render() {
    const tableRows = this.state.tableRows.map(row => {
      return (
        <Table.Row key={row.releaseId}>
          <Table.Cell>{row.trackTime}</Table.Cell>
          <Table.Cell>
            <a href={`'https://www.discogs.com/${row.trackUrl}'`}>{row.trackTitle}</a>
          </Table.Cell>
          <Table.Cell collapsing textAlign='center'>
            <Icon name='edit' />
          </Table.Cell>
          <Table.Cell collapsing textAlign='center'>
            <Icon name='delete' color='red' />
          </Table.Cell>
        </Table.Row>
      );
    })

    return (
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
                  <Table.HeaderCell colSpan='4'>
                      <Button floated='right' color='blue' inverted animated>
                          <Button.Content hidden>Export</Button.Content>
                          <Button.Content visible>
                              <Icon name='file outline'/>
                          </Button.Content>
                      </Button>
                      <Button floated='right' color='blue' inverted animated>
                          <Button.Content hidden>Share</Button.Content>
                          <Button.Content visible>
                              <Icon name='share'/>
                          </Button.Content>
                      </Button>
                      <Button size='medium' color='blue' inverted animated onClick={this.addTableRow}>
                          <Button.Content hidden>Add</Button.Content>
                          <Button.Content visible>
                              <Icon name='add circle'/>
                          </Button.Content>
                      </Button>
                      <Button size='medium' color='blue' inverted animated>
                          <Button.Content hidden>Save</Button.Content>
                          <Button.Content visible>
                              <Icon name='save'/>
                          </Button.Content>
                      </Button>
                  </Table.HeaderCell>
              </Table.Row>
          </Table.Footer>
      </Table>
    );
  }
}

export default TracklistTable;