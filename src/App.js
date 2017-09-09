import React, { Component } from 'react';
import {test} from './cSearch'
import {Date, Event, EventOption, EventOptionInstance} from './suppClasses'
import {init as firebaseInit, incLongLunch} from './firebase'
import logo from './logo.svg';
import './App.css';



class App extends Component {

  constructor(props) {
    super(props)
    firebaseInit()
  }

  render() {
    test();
    return (
      <div className="App">
      <div className="App-header">
      
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
      
      </div>
      <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <button type="button" onClick={incLongLunch}>Click Me!</button>
      <p id="llcount"></p>
      </div>
    );
  }
}

export default App;
