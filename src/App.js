import React, { Component } from "react";
import v4 from "uuid";
import { Container } from "semantic-ui-react";
import { loadState, saveState } from "./HelperFunctions/localStorage";

import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import TracklistTable from "./components/Tracklist/TracklistTable";

import "./style/App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      mixTitle: "",
      tracklist: []
    };

    this.addReleaseToTracklist = this.addReleaseToTracklist.bind(this);
    this.saveMixTitle = this.saveMixTitle.bind(this);
    this.addEmptyTrack = this.addEmptyTrack.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.editTrack = this.editTrack.bind(this);
    this.initialiseTracklist = this.initialiseTracklist.bind(this);
  }

  componentDidMount() {
    const savedState = loadState();
    this.setState({
      mixTitle: savedState.mixTitle,
      tracklist: savedState.tracklist
    });
  }

  componentDidUpdate() {
    saveState(this.state);
  }

  addReleaseToTracklist(track, trackTime) {
    const { trackTitle, trackUrl, trackLabel, releaseId } = track;
    this.setState(
      prevState => ({
        tracklist: prevState.tracklist.concat({
          trackTime,
          trackTitle,
          trackUrl,
          trackLabel,
          releaseId
        })
      }),
      () => this.sortTracklist(this.state.tracklist)
    );
  }

  saveMixTitle(title) {
    this.setState({ mixTitle: title });
  }

  addEmptyTrack() {
    const { tracklist } = this.state;
    this.setState({
      tracklist: [
        ...tracklist,
        {
          trackTime: 0,
          trackTitle: "",
          trackUrl: "",
          trackLabel: "",
          releaseId: v4()
        }
      ]
    });
  }

  deleteTrack(id) {
    this.setState({
      tracklist: this.state.tracklist.filter(track => track.releaseId !== id)
    });
  }

  editTrack(newTracklist) {
    this.setState(
      prevState => ({
        tracklist: [
          ...prevState.tracklist.filter(
            tracks => tracks.releaseId !== newTracklist.releaseId
          ),
          newTracklist
        ]
      }),
      () => this.sortTracklist(this.state.tracklist)
    );
  }

  sortTracklist(tracklist) {
    const sortedTracklist = tracklist.sort((a, b) => a.trackTime - b.trackTime);
    this.setState({
      tracklist: sortedTracklist
    });
  }

  initialiseTracklist() {
    this.setState({
      tracklist: [
        {
          trackTime: 0,
          trackTitle: "",
          trackUrl: "",
          trackLabel: "",
          releaseId: v4()
        }
      ]
    });
  }

  render() {
    return (
      <div className="b-app">
        <Container className="b-app-header">
          <div className="b-app-header--title">Tracklistah</div>
        </Container>
        <Container className="b-app-body">
          <div className="b-app-body-player">
            <AudioPlayer
              saveMixTitle={this.saveMixTitle}
              mixTitle={this.state.mixTitle}
              currentTracklist={this.state.tracklist}
              addReleaseToTracklist={this.addReleaseToTracklist}
              initialiseTracklist={this.initialiseTracklist}
            />
          </div>
          <div className="b-app-body-table">
            <TracklistTable
              tracklist={this.state.tracklist}
              addEmptyTrack={this.addEmptyTrack}
              deleteTrack={this.deleteTrack}
              editTrack={this.editTrack}
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
