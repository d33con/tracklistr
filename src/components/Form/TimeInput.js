import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

function TimeInput({ label, value, name, type, step, min, max, onChange }) {
  return (
    <div>
      <Form.Input
        label={label}
        value={value}
        name={name}
        type={type}
        step={step}
        min={min}
        onChange={onChange}
      />
    </div>
  );
}

TimeInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  step: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  max: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TimeInput;
