import React, {Component} from 'react'
import Crud from '../../../ui/crud'
import {Planning} from '../../../models'

export default class PlannerMainComponent extends Component {

  render () {
    return <main className='page-main-content'>
      <Crud model={new Planning()}/>
    </main>
  }
}
