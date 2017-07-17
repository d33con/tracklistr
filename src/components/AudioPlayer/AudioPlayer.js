import React from "react";
import PropTypes from "prop-types";
import { Card, Grid } from "semantic-ui-react";
import Controls from "./Controls";
import ImageSelector from "./ImageSelector";

import "../../style/AudioPlayer.css";

const mixTitle = "DJ Advance - Example mix July 2017";

function AudioPlayer({ currentTracklist, addReleaseToTracklist }) {
  return (
    <Grid centered columns={2} padded="vertically">
      <Grid.Column>
        <Card raised fluid color="blue" className="b-audio-player">
          <Card.Content>
            <ImageSelector />
            <Card.Header content={mixTitle} />
          </Card.Content>
          <Card.Content extra>
            <Controls
              currentTracklist={currentTracklist}
              addReleaseToTracklist={addReleaseToTracklist}
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

AudioPlayer.propTypes = {
  currentTracklist: PropTypes.arrayOf(PropTypes.object).isRequired,
  addReleaseToTracklist: PropTypes.func.isRequired
};

export default AudioPlayer;
