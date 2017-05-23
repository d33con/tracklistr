import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

function TimeInput({ label, value, name, onChange }) {
  return (
    <Form.Field>
      <Form.Input
        label={label}
        value={value}
        name={name}
        onChange={onChange}
        placeholder="Enter format hh:mm:ss"
      />
    </Form.Field>
  );
}

TimeInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TimeInput;
