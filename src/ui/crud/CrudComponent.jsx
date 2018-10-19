import React, {Component} from 'react'
import {Subject} from "rxjs/Rx";
import {isEmpty} from "ramda";

import Grid from '../grid'
import NewModelForm from '../model'
import CrudHeader from './CrudHeaderContainer'
import ActionBuilder from '../../redux/action-creators'

import CrudCommands from "../../service/shortcut/crud-command.service";

class Crud extends Component {
  command$ = new Subject()
  constructor ( props ) {
    super( props );
    this.actionCreator = new ActionBuilder(this.props.model)
    this.state = {};

    this.commands = new CrudCommands( ) // TODO @LEON this should be a singleton
    this.command$.subscribe( string => {
      if (string === 'showNewModel') this.showNewModel()
    })

    this.props.dispatch(this.actionCreator.loadCollection())
  }

  componentDidMount() {
    this.commands.instance(this.command$)
  }

  componentWillUnmount() {
    this.commands.teardown()
  }

  showNewModel () {
    this.props.dispatch({
      type: `CREATE_NEW_MODEL_${this.props.model.name.toUpperCase()}`
    })
  }

  hideNewModel () {
    this.props.dispatch({
      type: `DELETE_NEW_MODEL_${this.props.model.name.toUpperCase()}`
    })
  }

  getGrid () {
    return <Grid collection={this.props.collection} model={this.props.model}/>
  }

  getNewModelFormComponent () {
    return <NewModelForm model={this.props.model} dispatch={this.props.dispatch} hideForm={() => this.hideNewModel()}/>
  }

  getComponents () {
    if ( isEmpty(this.props.newModelState) ) return this.getGrid()
    return this.getNewModelFormComponent()
  }

  render () {
    return (
      <div>
        <CrudHeader name={this.props.model.name} quantity={this.props.collection.length} showNewModel={() => this.showNewModel()} />
        { this.getComponents() }
      </div>
    )
  }
}

export default Crud;
