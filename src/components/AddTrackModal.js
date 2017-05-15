import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import SearchBox from './SearchBox';
import TrackDetails from './TrackDetails';

class AddTrackModal extends Component {
  onSubmit: () => void;
  handleOnCancel: () => void;

  constructor(
    props: { currentTime: number, onClose: Function, shown: boolean },
  ) {
    super(props);
    this.state = {
      open: this.props.shown,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOnCancel = this.handleOnCancel.bind(this);
  }

  state: { open: boolean };

  onSubmit() {
    console.log('submitted');
    this.props.onClose();
  }

  handleOnCancel() {
    this.props.onClose();
  }

  render() {
    const { shown, onClose, currentTime } = this.props;
    return (
      <Modal size="fullscreen" open={shown} onClose={onClose} dimmer>
        <Modal.Header>
          Add New Track
        </Modal.Header>
        <Modal.Content>
          <SearchBox />
          <TrackDetails trackTime={currentTime} />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleOnCancel}>
            Cancel
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Save"
            onClick={this.onSubmit}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AddTrackModal;
