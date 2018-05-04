import React, {Component} from 'react'
import Crud from '../../../ui/crud'
import {Shift} from '../../../models'

import ShiftAssign from './ShiftAssignContainer'

export default class ShiftMainComponent extends Component {

  render () {
    return <main className='page-main-content'>
      <ShiftAssign />
      <Crud model={new Shift()}/>
    </main>
  }
}
