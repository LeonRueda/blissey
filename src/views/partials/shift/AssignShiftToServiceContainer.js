import Component from './AssignShiftToServiceComponent'
import {connect} from 'react-redux'
import {pathOr} from "ramda";

const mapStateToProps = state => ({
  shiftsAssignments: pathOr([], ['shiftAssignment', 'collection'], state)
})

export default connect(mapStateToProps)(Component)
