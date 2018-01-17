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
  }

  render () {
    return (
      <div>
        <CrudHeader name={this.props.model.name} quantity={this.props.model.collection.length} showNewModel={() => this.showNewModel()} />
        { !this.state.showNewModel ? <Grid model={this.props.model}/> : <NewModelForm model={this.props.model}/> }
      </div>
    )
  }
}

export default Crud;
