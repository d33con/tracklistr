import React from "react";
import { Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";
import { Container } from "semantic-ui-react";

import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import TracklistTable from "./components/Tracklist/TracklistTable";

import "./style/App.css";

import store from "./Store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="b-app">
        <div className="b-app-header">
          <div className="b-app-header--title">Tracklistah</div>
        </div>
        <Container className="b-app-body">
          <div className="b-app-body-player">
            <AudioPlayer />
          </div>
          <div className="b-app-body-table">
            <TracklistTable />
          </div>
        </Container>
        <DevTools />
      </div>
    </Provider>
  );
};

export default App;
