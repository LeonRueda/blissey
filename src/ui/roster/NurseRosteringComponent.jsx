import React, {Component} from 'react';
import {find, flatten, groupBy, isEmpty, map, mapObjIndexed, path, pathEq, pathOr, propEq, sum, values} from 'ramda'
import moment from 'moment'
import {getNurseInfo} from '../../models/user'
import {DEFAULT_DATE_FORMAT} from '../../utils/date'

const NIGHT_TYPE = 'Noche'

const findDailyAssignation = ([day], assignations) => {
  return find(propEq('date', day.format(DEFAULT_DATE_FORMAT)), assignations) || {}
}

const isNightType = pathEq(['shiftType', 'name'], NIGHT_TYPE)

const assignMissingShifts = (dailyAssignation) => {
  return mapObjIndexed(shifts => {
    return mapObjIndexed( ( shift, date ) => {
      if (isEmpty(shift)) {
        const yesterdayShift = shifts[moment(date).subtract(1, 'days').format(DEFAULT_DATE_FORMAT)]
        if (isNightType(yesterdayShift)) return {date, nurse: yesterdayShift.nurse, shiftType: {name: 'posturno', letterCode: 'P', workLoad: 0}}
        return {date, shiftType: {name: 'descanso', letterCode: 'D', workLoad: 0}}
      }
      return shift
    }, shifts)
  }, dailyAssignation)
}

const buildNurseDailyAssignation = (assignedShifts, dayRange) => {
  const assignationByNurse = groupBy(path(['nurse', 'id']), assignedShifts)

  const mapDailyAssignation = mapObjIndexed(
    assignations => mapObjIndexed(day => findDailyAssignation(day, assignations), dayRange),
    assignationByNurse
  )
  const assignation = assignMissingShifts(mapDailyAssignation)
  return assignation
}

const sumByWorkLoad = items => {
  const hours = map(path(['shiftType', 'workLoad']), values(items))
  return sum(hours)
}

const getBalance = pathOr(0, ['balance'])

const weekOfMonth = ({date}) => {
  return moment(date).isoWeek() - moment(date).startOf('month').isoWeek() + 1;
}

const buildWeeklyAssignation = dailyAssignations => {
  const totals = items => ({
    totalHours: sum(map(path(['shiftType', 'workLoad']), items)),
    isWeeklyTotal: true
  })
  const weeklyAssignation = groupBy(weekOfMonth, values(dailyAssignations))
  const weeklyAssignationWitTotals = map(assignations => [...assignations, totals(assignations)], weeklyAssignation)
  return flatten(values(weeklyAssignationWitTotals))
}

class NurseRosteringComponent extends Component {

  renderLineTotals (items) {
    return <div className={'subtotal'}><span><br/>{sumByWorkLoad(items)}</span></div>
  }
  renderNurseNewBalance (nurseId, items) {
    const nurse = getNurseInfo(this.props.nurses, nurseId)
    return <div className={'total'}><span><br/>{sumByWorkLoad(items) + getBalance(nurse)}</span></div>
  }

  renderNurseAssignationByDate (items) {
    const assignations = buildWeeklyAssignation(items)
    return values(mapObjIndexed(
      item => (
        <div className={`daily-assignation date-${moment(item.date).date()} ${item.isWeeklyTotal&&'week-total'}`}>
          {item.isWeeklyTotal && <span>Total<br/>{item.totalHours}</span>}
          {!item.isWeeklyTotal && <span>{item.shiftType.letterCode}<br/>{item.shiftType.workLoad}</span>}
        </div>
      ),
      assignations
    ))
  }

  renderNurseColumn ( nurseId ) {
    const nurse = getNurseInfo(this.props.nurses, nurseId)
    return <div className={'nurse'}><span>{nurse.name}</span></div>
  }

  getNurseAssignations () {
    const nurseAssignation = buildNurseDailyAssignation(this.props.assignedShifts, this.props.dayRange)
    return values(mapObjIndexed(
      ( items, nurseId ) => ([
        this.renderNurseColumn( nurseId ),
        this.renderNurseAssignationByDate(items),
        this.renderNurseBalance(nurseId),
        this.renderLineTotals(items),
        this.renderNurseNewBalance(nurseId, items)
      ]),
      nurseAssignation
    ))
  }

  renderNurseBalance (nurseId) {
    const nurse = getNurseInfo(this.props.nurses, nurseId)
    return (
      <div className={'nurse-balance'}><span><br/>{getBalance(nurse)}</span></div>
    )
  }

  render() {
    return (
      <div className={'nurse-roster'}>
        {this.getNurseRosterHeader()}
        {this.getNurseAssignations()}
      </div>
    );
  }

  getNurseRosterHeader () {
    return [
      <div className={'grid-header nurse'}><span className={'column-header'}>Nurse Name</span></div>,
      this.getColumnNames(),
      <div className={'grid-header nurse-balance'}><span className={'column-header'}>Balance</span></div>,
      <div className={'grid-header subtotal'}><span className={'column-header'}>Total<br/>Hours</span></div>,
      <div className={'grid-header total'}><span className={'column-header'}>Total</span></div>
    ]
  }

  getColumnNames () {
    const totals = items => ({
      label: 'Week',
      isWeeklyTotal: true
    })
    const weeklyAssignationHeaders = groupBy(item => weekOfMonth({date: item}), flatten(values(this.props.dayRange)))
    const weeklyAssignationWitTotalsHeaders = map(assignations => [...assignations, totals(assignations)], weeklyAssignationHeaders)
    return map(date => {
      return (
        !date.isWeeklyTotal ? dateHeader(date) : weekTotal(date)
      )
    }, flatten(values(weeklyAssignationWitTotalsHeaders)))
  }
}

const dateHeader = date => (
  <div className={`grid-header date`}>
    <span>{moment(date).format('dd')}</span>
    <br/>
    <span className={'column-header'}>{moment(date).date()}</span>
  </div>
)

const weekTotal = date => (
  <div className={`grid-header date`}>
    <span className={'column-header'}>{date.label}</span>
  </div>
)

export default NurseRosteringComponent;
