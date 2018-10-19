import React, {Component} from 'react'
import {loadShiftsByPlanner} from '../../redux/action-creators/shift'
import {loadUsers} from '../../redux/action-creators/user'
import {connect} from 'react-redux'
import {CalendarRosterComponent} from './CalendarRosterComponent'
import {getStatePlannerShifts} from '../../selectors/shift'
import {getStateNurses} from '../../selectors/nurse'
import {getPlanner} from '../../selectors/planner'
import {loadShiftTypes} from '../../redux/action-creators/shiftType'
import {getStateShiftTypes} from '../../selectors/shiftType'



class CalendarRosterContainer extends Component{
  componentDidMount () {
    this.props.loadShiftsByPlanner()
    this.props.loadUsers()
    this.props.loadShiftTypes()
  }

  render () {
    return <CalendarRosterComponent {...this.props}/>
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    loadShiftsByPlanner: () => dispatch(loadShiftsByPlanner(ownProps.plannerId)),
    loadUsers: () => dispatch(loadUsers()),
    loadShiftTypes: () => dispatch(loadShiftTypes())
  })
}

const mapStateToProps = (state, ownProps) => ({
  planner: getPlanner(ownProps.plannerId, state),
  shifts: getStatePlannerShifts(ownProps.plannerId, state),
  nurses: getStateNurses(state),
  shiftTypes: getStateShiftTypes(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarRosterContainer);
