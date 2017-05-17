import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import SearchBox from './SearchBox';

class AddTrackModal extends Component {
  constructor(
    props: {
      currentTime: number,
      onClose: Function,
      shown: boolean,
      addReleaseToTracklist: Function
    },
  ) {
    super(props);

    this.addReleaseToTracklist = this.addReleaseToTracklist.bind(this);
  }

  state: {
    currentTracklist: Array<Track>
  };
  addReleaseToTracklist: () => void;

  addReleaseToTracklist(track: Array<Track>) {
    this.props.addReleaseToTracklist(track);
    this.props.onClose();
  }

  render() {
    const { shown, onClose, currentTime } = this.props;
    let timeInMinsSecs = '';
    const minsLeft = Math.floor(currentTime / 60);
    const secsLeft = currentTime % 60;
    timeInMinsSecs = `${minsLeft}:${secsLeft < 10 ? '0' : ''}${secsLeft}`;

    return (
      <Modal size="fullscreen" open={shown} onClose={onClose} dimmer>
        <Modal.Header>
          Add New Track at {timeInMinsSecs}
        </Modal.Header>
        <Modal.Content>
          <SearchBox
            addReleaseToTracklist={result =>
              this.props.addReleaseToTracklist(result)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={this.props.onClose}
            icon="close"
            labelPosition="right"
            content="Close"
          />
          {/* <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Save"
            onClick={this.onSubmit}
          />*/}
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AddTrackModal;
