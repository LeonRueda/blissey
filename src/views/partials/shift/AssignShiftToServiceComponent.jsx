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
    this.props.saveShiftAssignation({
      serviceId: serviceId(this.props),
      day,
      shiftType,
      val
    })
  }

  getAssignment () {
    return prop('assignment', find(propEq('serviceId', `${this.props.model.serviceId}`), this.props.shiftsAssignments))
  }

  renderShiftTypeAssignation (day, shiftType) {
    const assignment = this.getAssignment()
    const assignmentTypeLens = lensPath([day.name, shiftType.name])
    return (
      <Row>
        <Column>
          <Input
            value={view(assignmentTypeLens, assignment)}
            handleChange={(evt) => this.saveModel(day.name, shiftType.name, evt.target.value)}/>
        </Column>
      </Row>
    )
  }

  render () {
    const {shiftTypes} = this.props
    return <Row>
      <Column classes='text-right'>
        <Row><Column><span>-</span></Column></Row>
        {map(shiftType => <Row><Column>{shiftType.name}</Column></Row>, shiftTypes)}
      </Column>
      {
        map( day => {
          return <Column key={day.name}>
            <Row><Column><span>{day.name}</span></Column></Row>
            {map(shiftType => this.renderShiftTypeAssignation(day, shiftType), shiftTypes)}
          </Column>
        }, DaysOfTheWeek)
      }
    </Row>
  }
}

export default AssignShiftToServiceComponent


