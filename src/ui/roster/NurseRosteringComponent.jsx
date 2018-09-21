import React, {Component} from 'react';
import {find, groupBy, isEmpty, map, mapObjIndexed, path, pathEq, propEq, sum, values} from 'ramda'
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

class NurseRosteringComponent extends Component {

  renderLineTotals (items) {
    return <div className={'subtotal'}><span>{sumByWorkLoad(items)}</span></div>
  }

  renderNurseAssignationByDate (items) {
    return values(mapObjIndexed(
      item => (
        <div className={`daily-assignation date-${moment(item.date).date()}`}>
          <span>{item.shiftType.letterCode}</span><br/>
          <span>{item.shiftType.workLoad}</span>
        </div>
      ),
      items
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
        this.renderLineTotals(items)
      ]),
      nurseAssignation
    ))
  }

  render() {
    return (
      <div className={'nurse-roster'}>
        {this.getNurseAssignations()}
      </div>
    );
  }
}

export default NurseRosteringComponent;
