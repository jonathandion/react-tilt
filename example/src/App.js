import React, { Component } from 'react';
import './App.css';
import Tilt from './tilt';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Tilt className="Tilt" style={{ height: 250, width: 250 }} >
            <div className="Tilt-inner">
            👽
            </div>
          </Tilt>
      </div>
    );
  }
}

export default App;
