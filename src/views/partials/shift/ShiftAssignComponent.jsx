import React, {Component} from 'react'
import {AssignShiftbyService} from '../../../models'
import Grid from "../../../ui/grid/GridComponent";
import {map, groupBy, filter, path} from 'ramda'



class ShiftAssignComponent extends Component{
  constructor (props) {
    super(props)


  }

  componentWillMount() {
    this.props.dispatch({type: 'LOAD_SHIFT_COLLECTION'})
    this.props.dispatch({type: 'LOAD_SERVICE_COLLECTION'})
  }

  getCollection () {
    console.log(this.props.services, this.props.shifts)
    const collection =  map(service => ({
      serviceName: service.name,
      shifts: groupBy(path(['shiftType', 'name']), filter(shift => shift.service.name === service.name, this.props.shifts))
    }), this.props.services)
    console.log(collection)
    return collection
  }

  render () {
    return !!this.getCollection().length && <Grid collection={this.getCollection()} model={new AssignShiftbyService()}/>
  }
}

export default ShiftAssignComponent

