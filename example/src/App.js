import React, { Component } from 'react';
import './App.css';
// import Tilt from 'react-tilt';
import Tilt from '../../dist/tilt.js'

class App extends Component {
  onMouseLeave(e) {
    console.log('clientY:', e.nativeEvent.clientY);
  }
  render() {
    return (
      <div className="App">
          <Tilt className="Tilt" style={{ height: 250, width: 250 }} onMouseLeave={this.onMouseLeave}>
            <div className="Tilt-inner">
            👽
            </div>
          </Tilt>
      </div>
    );
  }
}

export default App;
