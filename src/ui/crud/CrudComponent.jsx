import React, {Component} from 'react'
import Grid from '../grid'
import NewModelForm from '../model'
import CrudHeader from './CrudHeaderContainer'
import CrudCommands from "../../service/shortcut/crud-command.service";
import {Subject} from "rxjs/Rx";
import {isEmpty} from "ramda";
import ActionBuilder from '../../redux/action-creators'

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

  render () {
    return (
      <div>
        <CrudHeader name={this.props.model.name} quantity={this.props.collection.length} showNewModel={() => this.showNewModel()} />
        { isEmpty(this.props.newModelState) ? <Grid collection={this.props.collection} model={this.props.model}/> : <NewModelForm model={this.props.model} dispatch={this.props.dispatch} hideForm={() => this.hideNewModel()}/> }
      </div>
    )
  }
}

export default Crud;
