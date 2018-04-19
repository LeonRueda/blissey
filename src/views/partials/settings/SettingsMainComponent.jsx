import React, {Component} from 'react'
import Crud from '../../../ui/crud'
import {Title} from '../../../models'

export default class BuildingMainComponent extends Component {

  render () {
    return <main className='page-main-content'>
      <Crud model={new Title()}/>
    </main>
  }
}
