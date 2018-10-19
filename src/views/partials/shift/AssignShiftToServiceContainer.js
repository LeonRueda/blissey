import React, {Component} from 'react';
import AssignShiftToServiceComponent from './AssignShiftToServiceComponent'
import {connect} from 'react-redux'
import {pathOr} from "ramda";
import {getStateShiftTypes} from '../../../selectors/shiftType'
import {loadShiftTypes} from '../../../redux/action-creators/shiftType'
import {saveShiftAssignation} from '../../../redux/action-creators/shiftAssignment'
import {getServiceFromState} from '../../../selectors/shiftAssignation'

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

const mapStateToProps = (state, ownProps) => ({
  shiftsAssignments: pathOr([], ['shiftAssignment', 'collection'], state),
  shiftTypes: getStateShiftTypes(state),
  service: getServiceFromState(ownProps.model.serviceId, state)
})

export default connect(mapStateToProps, mapActions)(AssignShiftToServiceContainer)
