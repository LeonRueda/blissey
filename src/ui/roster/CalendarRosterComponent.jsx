import React, {PureComponent} from 'react';
import moment from 'moment';
import {find, groupBy, head, map, mapObjIndexed, pathOr, prop, propEq, split, values} from 'ramda'
import {DaysOfTheWeek} from '../../constants'
import {getPlannerShifts, mapAssignedShifts} from '../../models/shift'

const getNurseDisplayName = (item) => map(head, split(' ', getNurseName(item))).join('')

const getShiftCode = pathOr('N/A', ['shiftType', 'letterCode'])
const getNurseName = pathOr('N/A', ['nurse', 'name'])

const getDay = (shiftInfo) => {
  return prop('name', find(propEq('index', moment(prop('date', shiftInfo)).day()))(DaysOfTheWeek)).toLowerCase()
}

const getDate = (shiftInfo) => {
  return moment(prop('date', shiftInfo)).date()
}

export class CalendarRosterComponent extends PureComponent {

  getCalendarItems() {
    const assignedShifts = mapAssignedShifts(getPlannerShifts(this.props), this.props.shifts, this.props.shiftTypes, this.props.nurses)
    const shiftByDate = groupBy(prop("date"), assignedShifts)
    console.log(shiftByDate)
    return values(mapObjIndexed(
      shifts => (
        <div key={shifts.date} className={`calendar-item ${getDay(shifts[0])}`}>
          <div className={'date'}><span>{getDate(shifts[0])}</span></div>
          {map(item => <span>{getShiftCode(item)} - {getNurseDisplayName(item)}<br/></span>, shifts)}
        </div>
      ),
      shiftByDate
    ))
  }

  render() {
    return (
      <div className={'roster'}>
        <div className={'monday'}>monday</div>
        <div className={'tuesday'}>tuesday</div>
        <div className={'wednesday'}>wednesday</div>
        <div className={'thursday'}>thursday</div>
        <div className={'friday'}>friday</div>
        <div className={'saturday'}>saturday</div>
        <div className={'sunday'}>sunday</div>
        {
          this.getCalendarItems()
        }
      </div>
    );
  }
}

