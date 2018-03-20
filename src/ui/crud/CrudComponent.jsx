import React, {Component} from 'react'
import Grid from '../grid'
import NewModelForm from '../model'
import CrudHeader from './CrudHeaderComponent'
import CrudCommands from "../../service/shortcut/crud-command.service";
import {Subject} from "rxjs/Rx";


class Crud extends Component {
  command$ = new Subject()
  constructor ( props ) {
    super( props );
    this.state = {};

    this.commands = new CrudCommands( ) // TODO @LEON this should be a singleton
    this.command$.subscribe( string => {
      if (string === 'showNewModel') this.showNewModel()
    })
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
    this.setState({showNewModel : true});
  }

  hideNewModel () {
    this.setState({showNewModel: false})
  }

  render () {
    return (
      <div>
        <CrudHeader name={this.props.model.name} quantity={this.props.model.collection.length} showNewModel={() => this.showNewModel()} />
        { !this.state.showNewModel ? <Grid model={this.props.model}/> : <NewModelForm model={this.props.model} dispatch={this.props.dispatch} hideForm={() => this.hideNewModel()}/> }
      </div>
    )
  }
}

export default Crud;
