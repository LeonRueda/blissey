import React, {Component} from 'react';
import AssignShiftToServiceComponent from './AssignShiftToServiceComponent'
import {connect} from 'react-redux'
import {pathOr} from "ramda";
import {getStateShiftTypes} from '../../../selectors/shiftType'
import {loadShiftTypes} from '../../../redux/action-creators/shiftType'
import {saveShiftAssignation} from '../../../redux/action-creators/shiftAssignment'

class AssignShiftToServiceContainer extends Component {
  componentDidMount () {
    this.props.loadShiftTypes()
  }
  render() {
    return <AssignShiftToServiceComponent  {...this.props}/>
  }
}

const mapActions = {
  loadShiftTypes,
  saveShiftAssignation
}

const mapStateToProps = state => ({
  shiftsAssignments: pathOr([], ['shiftAssignment', 'collection'], state),
  shiftTypes: getStateShiftTypes(state)
})

export default connect(mapStateToProps, mapActions)(AssignShiftToServiceContainer)
