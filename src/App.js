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
  }

  componentDidMount() {
    const savedState = loadState();
    console.log(savedState);
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
    // **CHECK THIS!**
    let nextState = this.state.tracklist.concat({
      trackTime,
      trackTitle,
      trackUrl,
      trackLabel,
      releaseId
    });
    this.setState({ tracklist: nextState });
  }

  saveMixTitle(title) {
    this.setState({ mixTitle: title });
  }

  addEmptyTrack() {
    this.setState(prevState => ({
      tracklist: prevState.tracklist.concat({
        trackTime: 0,
        trackTitle: "",
        trackUrl: "",
        trackLabel: "",
        releaseId: v4()
      })
    }));
  }

  deleteTrack(id) {
    this.setState({
      tracklist: this.state.tracklist.filter(track => track.releaseId !== id)
    });
  }

  editTrack(newTracklist) {
    console.log("new state" + newTracklist);
    this.setState({
      tracklist: newTracklist.sort((a, b) => a.trackTime > b.trackTime)
    });
  }

  render() {
    return (
      <div className="b-app">
        <div className="b-app-header">
          <div className="b-app-header--title">Tracklistah</div>
        </div>
        <Container className="b-app-body">
          <AudioPlayer
            saveMixTitle={this.saveMixTitle}
            mixTitle={this.state.mixTitle}
            currentTracklist={this.state.tracklist}
            addReleaseToTracklist={this.addReleaseToTracklist}
          />
          <TracklistTable
            currentTracklist={this.state.tracklist}
            addEmptyTrack={this.addEmptyTrack}
            deleteTrack={this.deleteTrack}
            editTrack={this.editTrack}
          />
        </Container>
      </div>
    );
  }
}

export default App;
