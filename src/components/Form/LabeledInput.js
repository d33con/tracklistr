import React from 'react';
import { Form, Input } from 'semantic-ui-react';

function LabeledInput({
  label,
  innerLabel,
  value,
  name,
  onChange,
}: {
  label: string,
  value: string,
  innerLabel: string,
  name: string,
  onChange: Function
}) {
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

export default LabeledInput;
