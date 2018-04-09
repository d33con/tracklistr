import React from "react";
import PropTypes from "prop-types";
import { Card } from "semantic-ui-react";
import Controls from "./Controls";
import ImageSelector from "./ImageSelector";
import MixTitle from "./MixTitle";

import "../../style/AudioPlayer.css";

function AudioPlayer({
  mixTitle,
  saveMixTitle,
  currentTracklist,
  addReleaseToTracklist,
  initialiseTracklist
}) {
  return (
    <div>
      <Card raised fluid color="blue" className="audio-player">
        <Card.Content>
          <ImageSelector />
          <Card.Header
            content={<MixTitle title={mixTitle} saveNewTitle={saveMixTitle} />}
            className="mix-title"
          />
        </Card.Content>
        <Card.Content extra>
          <Controls
            currentTracklist={currentTracklist}
            addReleaseToTracklist={addReleaseToTracklist}
            initialiseTracklist={initialiseTracklist}
          />
        </Card.Content>
      </Card>
    </div>
  );
}

AudioPlayer.propTypes = {
  mixTitle: PropTypes.string,
  saveMixTitle: PropTypes.func.isRequired,
  currentTracklist: PropTypes.arrayOf(PropTypes.object).isRequired,
  addReleaseToTracklist: PropTypes.func.isRequired,
  initialiseTracklist: PropTypes.func.isRequired
};

export default AudioPlayer;
