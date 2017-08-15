import React from "react";
import PropTypes from "prop-types";
import { Card, Grid } from "semantic-ui-react";
import Controls from "./Controls";
import ImageSelector from "./ImageSelector";
import MixTitle from "./MixTitle";

import "../../style/AudioPlayer.css";

function AudioPlayer({
  mixTitle,
  saveMixTitle,
  currentTracklist,
  addReleaseToTracklist
}) {
  return (
    <Grid
      centered
      columns={2}
      padded="vertically"
      className="b-audio-player-container"
    >
      <Grid.Column>
        <Card raised fluid color="blue" className="b-audio-player">
          <Card.Content>
            <ImageSelector />
            <Card.Header
              content={
                <MixTitle title={mixTitle} saveNewTitle={saveMixTitle} />
              }
              className="b-audio-player-mix-title"
            />
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
  mixTitle: PropTypes.string,
  saveMixTitle: PropTypes.func.isRequired,
  currentTracklist: PropTypes.arrayOf(PropTypes.object).isRequired,
  addReleaseToTracklist: PropTypes.func.isRequired
};

export default AudioPlayer;
