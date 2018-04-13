import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import Notifications from './ui/notification'
import Header from './ui/app-header'
import Modal from './ui/modal'

 export class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Notifications />
        <Routes />
        <Modal />
      </div>
    );
  }
}

export default App;
