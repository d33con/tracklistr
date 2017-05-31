import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { loadState, saveState } from "./HelperFunctions/localStorage";

import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import TracklistTable from "./components/Tracklist/TracklistTable";

import "./style/App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      tracklist: []
    };

    this.addReleaseToTracklist = this.addReleaseToTracklist.bind(this);
  }

  componentDidMount() {
    const savedState = loadState();
    this.setState({ tracklist: savedState });
  }

  addReleaseToTracklist(track, trackTime) {
    const { title, uri, label, id } = track.result;
    let nextState = this.state.tracklist.concat({
      trackTime,
      trackTitle: title,
      trackUrl: `https://www.discogs.com${uri}`,
      trackLabel: label.length && label[0],
      releaseId: id
    });
    this.setState({ tracklist: nextState });
    saveState(nextState);
  }

  render() {
    return (
      <div className="b-app">
        <div className="b-app-header">
          <div className="b-app-header--title">Tracklistr</div>
        </div>
        <Container className="b-app-body">
          <AudioPlayer
            currentTracklist={this.state.tracklist}
            addReleaseToTracklist={this.addReleaseToTracklist}
          />
          <TracklistTable currentTracklist={this.state.tracklist} />
        </Container>
      </div>
    );
  }
}

export default App;
