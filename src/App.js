import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import TracklistTable from "./components/Tracklist/TracklistTable";

import "./style/App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      tracklist: [
        {
          trackTime: 0,
          trackTitle: "Caroline K - Tracking With Close Ups",
          trackUrl: "Caroline-K-Now-Wait-For-Last-Year/release/10182988",
          trackLabel: "Blackest Ever Black",
          releaseId: 10182988
        },
        {
          trackTime: 60,
          trackTitle: "Foul Play - Being With You (Foul Play remix)",
          trackUrl: "Foul-Play-Vol-4-Remixes-Part-I/release/125038",
          trackLabel: "Moving Shadow",
          releaseId: 125038
        }
      ]
    };
    this.addReleaseToTracklist = this.addReleaseToTracklist.bind(this);
  }

  componentDidMount() {
    // update state
  }

  addReleaseToTracklist(track, trackTime) {
    const { title, uri, label, id } = track.result;
    this.setState(prevState => ({
      tracklist: prevState.tracklist.concat({
        trackTime,
        trackTitle: title,
        trackUrl: `https://www.discogs.com${uri}`,
        trackLabel: label.length && label[0],
        releaseId: id
      })
    }));
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
