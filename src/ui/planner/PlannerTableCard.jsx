import React, {Component} from 'react'
import moment from "moment";
import daysOfweek from '../../constants/DaysOfTheWeek'
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
  propEq
} from "ramda";

class PlannerTableCard extends Component {
  componentWillMount () {
    this.props.dispatch({type: 'LOAD_SHIFTASSIGNMENT_COLLECTION'})
  }

  getDiffDays () {
    const startDate = moment(path(['timeLapse', 'startDate'], this.props.newModelState))
    const endDate = moment(path(['timeLapse', 'endDate'], this.props.newModelState))

    return endDate.diff(startDate, 'd') + 1
  }

  getShifts () {
    const serviceIds = map(prop('id'), pathOr([], ['services'], this.props.newModelState))
    const assignments = map(prop('assignment'), filter(
      a => any(contains(a.serviceId), serviceIds), pathOr([], ['collections', 'shiftAssignment'], this.props)
    ))
    const days = getDates(propOr({}, ['timeLapse'], this.props.newModelState), this.getDiffDays())
    return sum(flatten(map(day => map(a => values(propOr({}, day)(a)), assignments), days)))
  }

  getHours () {
    return this.getShifts() * 12
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
          Hours: {this.getHours()}
        </div>
      </div>
    </div>
  }
}

const getDates = (timeLapse, days)=> {
  const startDate = moment(timeLapse.startDate)

  return times(i => prop('name')(find(propEq('index', moment(startDate.add(1, 'd')).day()), daysOfweek)), days)
}

export default PlannerTableCard



