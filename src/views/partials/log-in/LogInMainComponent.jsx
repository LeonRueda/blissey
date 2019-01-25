import React, {Component} from 'react'
import __ from '../../../i18n'
import {API_URL} from '../../../config/endpoints'

export default class LogInMainComponent extends Component {

  render () {
    return <div className="main-container log-in-main-container">
      <section className="main"></section>
      <section className="helper strict">
        <div className="log-in-container">
          <div className="row-fluid">
            <span className="logo-main-name-bold">Nurse</span>
          </div>
          <div className="row-fluid">
            <span className="logo-main-name">Planner</span>
          </div>
          <form method="POST" action={API_URL.login}>
            <div className="row-fluid show-grid-extra-large">
              <input type="email" name="email" className="np-input text-input first-field-focus" placeholder={ __('Email or Username') }/>
            </div>
            <div className="row-fluid show-grid-extra-large">
              <input type="password" name="password"  className="np-input text-input" placeholder={ __('Password') }/>
              <input type="hidden" name="next" value="planning"/>
            </div>
            <div className="row-fluid show-grid-extra-large">
              <button type="submit" className="np-button button-submit" >{__('Sign In')}</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  }
}
