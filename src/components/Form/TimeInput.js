import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

function TimeInput({ label, value }) {
  return (
    <div>
      <Form.Input label={label} value={value} />
    </div>
  );
}

TimeInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func
};

export default TimeInput;
