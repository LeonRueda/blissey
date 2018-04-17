import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import Notifications from './ui/notification'
import Header from './ui/app-header'
import Modal from './ui/modal'
import Sidebar from "./ui/sidebar";

 export class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Notifications />
        <Routes />
        <Sidebar />
        <Modal />
      </div>
    );
  }
}

export default App;
