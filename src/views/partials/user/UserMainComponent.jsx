import React, {Component} from 'react'
import Crud from '../../../ui/crud'
import {User} from '../../../models'

export default class UserMainComponent extends Component {

  render () {
    return <main className='page-main-content'>
      <Crud model={new User()}/>
    </main>
  }
}
