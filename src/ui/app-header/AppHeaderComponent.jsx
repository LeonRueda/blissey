import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
    <header className="app-header">
      <nav className={'nav-bar-top'}>
        <ul>
          <li><Link to="/building">Admin Building</Link></li>
          <li><Link to="/log-in">Log In</Link></li>
        </ul>
      </nav>
    </header>
)
