import React from 'react';
import { Form, Input } from 'semantic-ui-react';

function componentName(
  props: {
    trackTime: string,
    trackTitle: string,
    trackUrl: string,
    trackLabel: string
  },
) {
  const { trackTime, trackTitle, trackUrl, trackLabel } = props;
  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Input label="Time" value={trackTime} />
        <Form.Input label="Title" value={trackTitle} />
        <Form.Input label="Label" value={trackLabel} />
        <Form.Input label="Track Link">
          <Input label="www.discogs.com/" value={trackUrl} />
        </Form.Input>
      </Form.Group>
    </Form>
  );
}

export default componentName;
