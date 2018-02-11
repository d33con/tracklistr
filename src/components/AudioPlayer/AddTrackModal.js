import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "semantic-ui-react";

import convertTimeToString from "../../HelperFunctions/ConvertTimeToString";
import SearchBox from "../Search/SearchBox";

import "../../style/AddTrackModal.css";

const AddTrackModal = ({ shown, onClose, currentTime }) => (
  <Modal
    size="fullscreen"
    open={shown}
    onClose={onClose}
    dimmer
    className="b-modal"
  >
    <Modal.Header className="b-modal-header">
      Adding New Track at {convertTimeToString(currentTime)}
    </Modal.Header>
    <Modal.Content className="b-modal-content">
      <SearchBox />
    </Modal.Content>
    <Modal.Actions className="b-modal-footer">
      <Button
        negative
        onClick={onClose}
        icon="close"
        labelPosition="right"
        content="Cancel"
      />
    </Modal.Actions>
  </Modal>
);

AddTrackModal.propTypes = {
  currentTime: PropTypes.number.isRequired,
  shown: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddTrackModal;
