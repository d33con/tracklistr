import React from "react";
import { Form } from "semantic-ui-react";

import TimeInput from "./Form/TimeInput";

const onChange = () => {
  console.log("changed");
};

function TrackDetails({ trackTime, currentlySelectedSearchResult }) {
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
        <Form.Input label="Track Link" />
      </Form.Group>
    </Form>
  );
}

export default TrackDetails;
