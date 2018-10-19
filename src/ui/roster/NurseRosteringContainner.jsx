import React, {Component} from 'react';
import NurseRosteringComponent from './NurseRosteringComponent'
import {getPlanner} from '../../selectors/planner'
import {getStatePlannerShifts} from '../../selectors/shift'
import {getStateNurses} from '../../selectors/nurse'
import connect from 'react-redux/es/connect/connect'
import {getStateShiftTypes} from '../../selectors/shiftType'
import {getPlannerShifts, mapAssignedShifts} from '../../models/shift'
import {groupBy, map, prop, range, reduce} from 'ramda'
import moment from 'moment'
import {DEFAULT_DATE_FORMAT} from '../../utils/date'

class NurseRosteringContainner extends Component {
  render() {
    return (
      <NurseRosteringComponent {...this.props}/>
    );
  }
}

const compareDate = comparison => (acc, item) => moment[comparison]([moment(prop('date', item)), acc])
const compareMinDate = compareDate('min')
const compareMaxDate = compareDate('max')
const getTimeLapse = shifts => ({
  startDate: reduce(compareMinDate, moment(prop('date', shifts[0])), shifts),
  endDate: reduce(compareMaxDate, moment(prop('date', shifts[0])), shifts)
})
const getRange = ({endDate, startDate}) => groupBy(
  item => item.format(DEFAULT_DATE_FORMAT),
  map(item => moment(startDate).add(item, 'days'), range(0, endDate.diff(startDate, 'days') + 1))
)

const mapStateToProps = (state, ownProps) => {
  const shifts = getStatePlannerShifts(ownProps.plannerId, state)
  const planner = getPlanner(ownProps.plannerId, state)
  const shiftTypes = getStateShiftTypes(state)
  const nurses = getStateNurses(state)
  const assignedShifts = mapAssignedShifts(
    planner.shifts,
    shifts,
    shiftTypes,
    nurses
  )
  const timeLapse = getTimeLapse(assignedShifts);
  const dayRange = getRange(timeLapse)
  return ({
    planner,
    shifts,
    nurses,
    shiftTypes,
    assignedShifts,
    dayRange
  })
}

export default connect(mapStateToProps)(NurseRosteringContainner);
