import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "semantic-ui-react";

function LabeledInput({ label, innerLabel, value, name, onChange }) {
  return (
    <Form.Field>
      <Form.Input label={label}>
        <Input
          label={innerLabel}
          value={value}
          name={name}
          onChange={onChange}
        />
      </Form.Input>
    </Form.Field>
  );
}

LabeledInput.propTypes = {
  label: PropTypes.string.isRequired,
  innerLabel: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default LabeledInput;
