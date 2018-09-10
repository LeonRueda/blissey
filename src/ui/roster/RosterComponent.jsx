import React, {Component} from 'react';
import {connect} from 'react-redux'
import moment from 'moment';
import {map, path, pathOr, values, find, propEq, groupBy, prop, mapObjIndexed, split, head} from 'ramda'
import {DaysOfTheWeek} from '../../constants'
import {loadShifts} from '../../redux/action-creators/shift'
import {loadUsers} from '../../redux/action-creators/user'

const getPlanner = (plannerId, state) => path(['planner', 'onGoing', plannerId], state)

const getNurseDisplayName = (item) =>  map(head, split(' ', getNurseName(item))).join('')

const getShiftCode = pathOr('N/A', ['shiftType', 'code'])
const getNurseName = pathOr('N/A', ['nurse', 'name'])
const getPlannerShifts = pathOr([], ['planner', 'shifts'])
const getStateShifts = pathOr([], ['shift', 'collection'])
const getStateNurses = pathOr([], ['user', 'collection'])

const getDay = (shiftInfo) => {
  return prop('name', find(propEq('index', moment(prop('date', shiftInfo)).day()))(DaysOfTheWeek)).toLowerCase()
}

const getDate = (shiftInfo) => {
  return moment(prop('date', shiftInfo)).date()
}

class RosterComponent extends Component {
  componentDidMount () {
    this.props.loadShifts()
    this.props.loadUsers()
  }

  getCalendarItems () {
    const assignedShifts = map(item => {
      const shiftInfo = find(propEq('id', item.id))( this.props.shifts )
      return {...shiftInfo, nurse: find(propEq('id', item.nurseId), this.props.nurses)}
    }, values(getPlannerShifts(this.props)))
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

const mapDispatchToProps = {
  loadShifts,
  loadUsers
}

const mapStateToProps = (state, ownProps) => ({
  planner: getPlanner(ownProps.plannerId, state),
  shifts: getStateShifts(state),
  nurses: getStateNurses(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(RosterComponent);
