import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import Notifications from './ui/notification'
import Header from './ui/app-header'

 export class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Notifications />
        <Routes />
      </div>
    );
  }
}

export default App;
