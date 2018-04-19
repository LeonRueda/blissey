import React from 'react'
import { Link } from 'react-router-dom'
import __ from '../../i18n'

export default props => <nav  className="app-navigation">
  <ul>
    <li><Link to="#!" >{__('On Going Planners')}</Link></li>
    <li><Link to="/building">{__('Buildings')}</Link></li>
    <li><Link to="/service" >{__('Services')}</Link></li>
    <li><Link to="/user" >{__('Users')}</Link></li>
    <li><Link to="#!" >{__('Rules')}</Link></li>
    <li><Link to="/settings" >{__('Settings')}</Link></li>
  </ul>
</nav>
