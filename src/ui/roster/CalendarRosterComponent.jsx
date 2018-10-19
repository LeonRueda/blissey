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
        <div className={'grid-header monday'}><span className={'column-header'}>monday</span></div>
        <div className={'grid-header tuesday'}><span className={'column-header'}>tuesday</span></div>
        <div className={'grid-header wednesday'}><span className={'column-header'}>wednesday</span></div>
        <div className={'grid-header thursday'}><span className={'column-header'}>thursday</span></div>
        <div className={'grid-header friday'}><span className={'column-header'}>friday</span></div>
        <div className={'grid-header saturday'}><span className={'column-header'}>saturday</span></div>
        <div className={'grid-header sunday'}><span className={'column-header'}>sunday</span></div>
        {
          this.getCalendarItems()
        }
      </div>
    );
  }
}

