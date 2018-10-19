import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import Notifications from './ui/notification'
import Header from './ui/app-header'
import Modal from './ui/modal'
import Sidebar from "./ui/sidebar";
import {Router} from 'react-router-dom'

import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

 export class App extends Component {
  render() {
    return (
        <Router history={history}>
          <div className="App">
              <Header />
              <Notifications />
              <Routes />
              <Sidebar />
              <Modal />
          </div>
        </Router>
    );
  }
}

export default App;
