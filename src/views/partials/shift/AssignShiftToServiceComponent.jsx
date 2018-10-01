import React, {Component} from 'react'
import {Column, Row} from "../../../ui/grid"
import Input from "../../../ui/input/StandarInputComponent"
import {find, lensPath, map, path, propEq, view} from "ramda";
import {DaysOfTheWeek} from "../../../constants";
import {getDefaultNurses} from '../../../models/service'

const serviceId = path(['model', 'serviceId'])

class AssignShiftToServiceComponent extends Component{
  constructor (props) {
    super(props)
  }

  saveModel(day, shiftType, nurseTitle, val) {
    this.props.saveShiftAssignation({
      serviceId: serviceId(this.props),
      day,
      shiftType,
      nurseTitle,
      val
    })
  }

  getAssignment (nurseTitle) {
    return path(['assignment', nurseTitle], find(propEq('serviceId', `${this.props.model.serviceId}`), this.props.shiftsAssignments))
  }

  renderShiftTypeAssignation (day, nurseTitle) {
    return shiftType => {
      const assignment = this.getAssignment(nurseTitle)
      const assignmentTypeLens = lensPath([day.name, shiftType.name])
      return (
        <Row>
          <Column>
            <Input
              placeholder={getDefaultNurses(this.props.service, nurseTitle)}
              value={view(assignmentTypeLens, assignment)}
              handleChange={(evt) => this.saveModel(day.name, shiftType.name, nurseTitle, evt.target.value)}/>
          </Column>
        </Row>
      )
    }
  }

  render () {
    const {shiftTypes} = this.props
    return [<Row key={'jefe'}>
      <Column classes='text-right'>
        <Row><Column><span>Jefes</span></Column></Row>
        {map(ShiftTypeNameColumn, shiftTypes)}
      </Column>
      {
        map( day => (
          <Column key={day.name}>
            <Row><Column><span>{day.name}</span></Column></Row>
            {map(this.renderShiftTypeAssignation(day, 'jefe'), shiftTypes)}
          </Column>
        ), DaysOfTheWeek)
      }
    </Row>,
      <Row key={'auxiliar'}>
        <Column classes='text-right'>
          <Row><Column><span>Auxiliares</span></Column></Row>
          {map(ShiftTypeNameColumn, shiftTypes)}
        </Column>
        {
          map( day => (
            <Column key={day.name}>
              <Row><Column><span>{day.name}</span></Column></Row>
                {map(this.renderShiftTypeAssignation(day, 'auxiliar'), shiftTypes)}
            </Column>
          ), DaysOfTheWeek)
        }
      </Row>]
  }
}

const ShiftTypeNameColumn = shiftType => <Row><Column style={{padding: '5px'}}>{shiftType.name}</Column></Row>

export default AssignShiftToServiceComponent


