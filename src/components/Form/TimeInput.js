import React from 'react';
import { Form } from 'semantic-ui-react';

function TimeInput({
  label,
  value,
  name,
  onChange,
}: { label: string, value: string, name: string, onChange: Function }) {
  return (
    <Form.Field>
      <Form.Input label={label} value={value} name={name} onChange={onChange} />
    </Form.Field>
  );
}

export default TimeInput;
