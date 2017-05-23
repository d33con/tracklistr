import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

function TextInput({ label, value, name, onChange }) {
  return (
    <Form.Field>
      <Form.Input label={label} value={value} name={name} onChange={onChange} />
    </Form.Field>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextInput;
