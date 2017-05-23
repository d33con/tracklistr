import React from 'react';
import { Form, Input } from 'semantic-ui-react';

import TimeInput from './Form/TimeInput';

const onChange = () => {
  console.log('changed');
};

function TrackDetails(
  props: {
    trackTime: string,
    currentlySelectedSearchResult: Object
  },
) {
  const { trackTime, currentlySelectedSearchResult } = props;
  return (
    <Form>
      <Form.Group widths="equal">
        <TimeInput
          label="Time"
          value={trackTime}
          name="Time"
          onChange={onChange}
        />
        <Form.Input label="Title" value="Title" />
        <Form.Input label="Label" />
        <Form.Input label="Track Link">
          <Input label="www.discogs.com/" value="Link" />
        </Form.Input>
      </Form.Group>
    </Form>
  );
}

export default TrackDetails;
