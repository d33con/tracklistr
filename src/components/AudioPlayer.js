import React from 'react';
import Controls from './Controls';
import { Card, Grid, Image } from 'semantic-ui-react';

import coverImg from '../img/test.jpg';

import '../style/AudioPlayer.css';

const mixArtist = "DJ Advance";
const mixTitle = "Example mix May 2017";

function AudioPlayer() {
  return (
    <Grid centered columns={2} padded='vertically'>
      <Grid.Column>
        <Card raised fluid color='blue' className="b-audio-player">
          <Card.Content>
            <Image src={coverImg} className="b-audio-player--cover-img" />
            <Card.Header content={mixArtist} />
            <Card.Content description={mixTitle} />
          </Card.Content>
          <Card.Content extra>
            <Controls />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default AudioPlayer;
