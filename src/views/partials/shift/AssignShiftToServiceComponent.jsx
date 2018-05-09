import React, {Component} from 'react'
import {Column, Row} from "../../../ui/grid"
import Input from "../../../ui/input/StandarInputComponent"
import {find, lensPath, map, path, prop, propEq, view} from "ramda";
import {DaysOfTheWeek} from "../../../constants";

const serviceId = path(['model', 'serviceId'])

class AssignShiftToServiceComponent extends Component{
  constructor (props) {
    super(props)
  }

  saveModel(day, shiftType, val) {
    this.props.dispatch({
      type: 'SET_ASSIGN_TO_SERVICE',
      serviceId: serviceId(this.props),
      day,
      shiftType,
      val
    })
    this.props.dispatch({
      type: 'PERSIST_ASSIGN_TO_SERVICE',
      serviceId: serviceId(this.props)
    })
  }

  getAssignment () {
    return prop('assignment', find(propEq('serviceId', `${this.props.model.serviceId}`), this.props.shiftsAssignments))
  }

  render () {
    return <Row>
      <Column classes='text-right'>
        <Row><Column><span>-</span></Column></Row>
        <Row><Column>Día</Column></Row>
        <Row><Column>Noche</Column></Row>
      </Column>
      {map( day => {
        const assignment = this.getAssignment()
        const assignmentDayLens = lensPath([day.name, 'day'])
        const assignmentNightLens = lensPath([day.name, 'night'])
        return <Column key={day.name}>
          <Row><Column><span>{day.name}</span></Column></Row>
          <Row><Column><Input value={view(assignmentDayLens, assignment)} handleChange={(evt) => this.saveModel(day.name, 'day', evt.target.value)}/></Column></Row>
          <Row><Column><Input value={view(assignmentNightLens, assignment)} handleChange={(evt) => this.saveModel(day.name, 'night', evt.target.value)}/></Column></Row>
        </Column>}, DaysOfTheWeek)}
    </Row>
  }
}

export default AssignShiftToServiceComponent


