import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import Routes from './routes'

 export class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React Main</h1>
            <ul>
                <li><Link to="/building">Admin Building</Link></li>
                <li><Link to="/log-in">Log In</Link></li>
            </ul>
        </header>
        <Routes />
      </div>
    );
  }
}

export default App;
