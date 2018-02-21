import React, {Component} from 'react'
import __ from '../../../i18n'

export default class LogInMainComponent extends Component {

  render () {
    return <div class="main-container log-in-main-container">
      <section class="main"></section>
      <section class="helper strict">
        <div class="log-in-container">
          <div class="row-fluid">
            <span class="logo-main-name-bold">Nurse</span>
          </div>
          <div class="row-fluid">
            <span class="logo-main-name">Planner</span>
          </div>
          <form method="POST" action="http://localhost:1337/login">
            <div class="row-fluid show-grid-extra-large">
              <input type="email" name="email" class="np-input text-input first-field-focus" placeholder={ __('Email or Username') }/>
            </div>
            <div class="row-fluid show-grid-extra-large">
              <input type="password" name="password"  class="np-input text-input" placeholder={ __('Password') }/>
              <input type="hidden" name="next" value="building"/>
            </div>
            <div class="row-fluid show-grid-extra-large">
              <button type="submit" class="np-button button-submit" >{__('Sign In')}</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  }
}
