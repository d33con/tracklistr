import React from 'react';
import Controls from './Controls';
import { Card } from 'semantic-ui-react';

function AudioPlayer() {
  return (
    <Card>
      <Card.Content>
        <audio controls="controls"
          src="https://d778008a60e856cc9716-de7a668058c1db97713a59708a969f8c.ssl.cf3.rackcdn.com/pm026a.mp3?mc_cid=97526204b9&amp;mc_eid=4fa2fa5d03"
          type="audio/mpeg">
        </audio>
        <Controls />
      </Card.Content>
    </Card>
  );
}

export default AudioPlayer;
