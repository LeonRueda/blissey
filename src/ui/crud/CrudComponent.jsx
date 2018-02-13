import React, {Component} from 'react'
import Grid from '../grid'
import NewModelForm from '../model'
import CrudHeader from './CrudHeaderComponent'

class Crud extends Component {
  constructor ( props ) {
    super( props );
    this.state = {};

  }

  showNewModel () {
    this.setState({showNewModel : true});
    this.props.dispatch({
      type: `NEW_MODEL_${this.props.model.name.toUpperCase()}`
    })
  }

  render () {
    return (
      <div>
        <CrudHeader name={this.props.model.name} quantity={this.props.model.collection.length} showNewModel={() => this.showNewModel()} />
        { !this.state.showNewModel ? <Grid model={this.props.model}/> : <NewModelForm model={this.props.model} dispatch={this.props.dispatch}/> }
      </div>
    )
  }
}

export default Crud;
