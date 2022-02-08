import React, {Component} from 'react'
import moment from "moment";
import daysOfweek from '../../constants/DaysOfTheWeek'
import {getUserAvailableHours} from '../../service/user/user-service'
import {
  path,
  map,
  filter,
  any,
  contains,
  pathOr,
  values,
  flatten,
  sum,
  prop,
  propOr,
  times,
  find,
  propEq, mapObjIndexed, reduce, max
} from "ramda";

class PlannerTableCard extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'LOAD_SHIFTASSIGNMENT_COLLECTION'})
  }

  getDiffDays () {
    const startDate = moment(path(['timeLapse', 'startDate'], this.props.newModelState))
    const endDate = moment(path(['timeLapse', 'endDate'], this.props.newModelState))

    return endDate.diff(startDate, 'd') + 1
  }

  getAssignments () {
    const serviceIds = map(prop('id'), pathOr([], ['services'], this.props.newModelState))
    return map(prop('assignment'), filter(
      a => any(contains(a.serviceId), serviceIds), pathOr([], ['collections', 'shiftAssignment'], this.props)
    ))
  }

  getShifts () {
    const assignments = this.getAssignments()
    const days = getDates(propOr({}, ['timeLapse'], this.props.newModelState), this.getDiffDays())
    return sum(flatten(map(day => map(a => values(propOr({}, day)(a)), assignments), days)))
  }

  getHours () {
    return this.getShifts() * 12
  }

  getMinNurses () {
    const assignments = this.getAssignments()
    const shiftsByDay = values(mapObjIndexed((day, algo)  => {
      return {
        day: day.name,
        shifts: reduce((acc, shifts) => ({
          day: acc.day + Number(propOr(0, 'day', shifts)),
          night: acc.night + Number(propOr(0, 'night', shifts)),
        }), {day: 0, night: 0}, map(prop(day.name), assignments))
      }
    }, daysOfweek))
    return reduce((acc, {shifts}) => max(acc, max(shifts.day, shifts.night)), 0, shiftsByDay)
  }

  getAvailableHours () {
    const users = map(getUserAvailableHours(this.getDiffDays()),pathOr([], ['nurses'], this.props.newModelState))
    return Math.ceil(sum(users))
  }

  render () {
    return <div className='container-fluid model-table-container'>
      <div className="row">
        <div className="col">
          Days: {this.getDiffDays()}
        </div>
        <div className="col">
          Shifts: {this.getShifts()}
        </div>
        <div className="col">
          Min Nurses: {this.getMinNurses()}
        </div>
      </div>
      <div className="row">
        <div className="col">
          Required Hours: {this.getHours()}
        </div>
        <div className="col">
          Available Hours: {this.getAvailableHours()}
        </div>
      </div>
    </div>
  }
}

const getDates = (timeLapse, days)=> {
  const startDate = moment(timeLapse.startDate)

  return times(i => prop('name')(find(propEq('index', moment(startDate.add(i > 0 ? 1 : i, 'd')).day()), daysOfweek)), days)
}

export default PlannerTableCard
