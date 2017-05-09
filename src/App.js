// @flow
import React from 'react';
import { Container } from 'semantic-ui-react';

import AudioPlayer from './components/AudioPlayer';
import SearchBox from './components/SearchBox';
import TracklistTable from './components/TracklistTable';

import './style/App.css';

function App() {
  return (
    <div className="b-app">
      <div className="b-app-header">
        <div className="b-app-header--title">Tracklistr</div>
      </div>
      <Container className="b-app-body">
        <AudioPlayer />
        <SearchBox />
        <TracklistTable />
      </Container>
    </div>
  );
}

export default App;
