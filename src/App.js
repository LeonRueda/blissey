import React, { Component, Fragment } from 'react';
import './App.css';
import Routes from './routes'
import Notifications from './ui/notification'
import Header from './ui/app-header'
import Modal from './ui/modal'
import Sidebar from "./ui/sidebar";
import {Router} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux'

import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

 export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Router history={history}>
            <Layout />
          </Router>
        </BrowserRouter>
      </Provider>
    );
  }
}

const Layout = () => (
  <Fragment>
    <Header />
    <Notifications />
    <Routes />
    <Sidebar />
    <Modal />
  </Fragment>
)

export default App;
