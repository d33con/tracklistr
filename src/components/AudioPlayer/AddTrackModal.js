import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "semantic-ui-react";
import convertTimeToString from "../../HelperFunctions/ConvertTimeToString";

import SearchBox from "../Search/SearchBox";

function AddTrackModal({ shown, onClose, currentTime, addReleaseToTracklist }) {
  return (
    <Modal size="fullscreen" open={shown} onClose={onClose} dimmer>
      <Modal.Header>
        Add New Track at {convertTimeToString(currentTime)}
      </Modal.Header>
      <Modal.Content>
        <SearchBox
          addReleaseToTracklist={result => addReleaseToTracklist(result)}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          negative
          onClick={onClose}
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

AddTrackModal.propTypes = {
  currentTime: PropTypes.number.isRequired,
  shown: PropTypes.bool.isRequired,
  addReleaseToTracklist: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddTrackModal;
