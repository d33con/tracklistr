import React from "react";
import { inject, observer } from "mobx-react";
import { Card } from "semantic-ui-react";
import Controls from "./Controls";
import ImageSelector from "./ImageSelector";
import MixTitle from "./MixTitle";

import "../../style/AudioPlayer.css";

const AudioPlayer = inject(["store"])(
  observer(({ store, addReleaseToTracklist }) => (
    <div className="b-audio-player-container">
      <Card raised fluid color="blue" className="b-audio-player">
        <Card.Content>
          <ImageSelector />
          <Card.Header
            content={<MixTitle />}
            className="b-audio-player-mix-title"
          />
        </Card.Content>
        <Card.Content extra>
          <Controls addReleaseToTracklist={addReleaseToTracklist} />
        </Card.Content>
      </Card>
    </div>
  ))
);

export default AudioPlayer;
