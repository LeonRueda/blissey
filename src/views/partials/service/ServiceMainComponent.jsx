import React, {Component} from 'react'
import Crud from '../../../ui/crud'
import {Service} from '../../../models'

export default class BuildingMainComponent extends Component {

  render () {
    return <main className='page-main-content'>
      <Crud model={new Service()}/>
    </main>
  }
}
