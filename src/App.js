import React, { Component } from 'react';
import AudioPlayer from './components/AudioPlayer';
import Test from './components/Test';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Tracklistr</h2>
        </div>
        <AudioPlayer />
        <Test />
      </div>
    );
  }
}

export default App;
