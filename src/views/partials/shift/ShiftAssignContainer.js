import Component from './ShiftAssignComponent'
import {connect} from 'react-redux'
import {pathOr} from 'ramda'

const mapStateToProps = (state, ownProps) => ({
  services: pathOr([], [`service`, 'collection'], state),
  shiftsAssignments: pathOr([], ['shiftAssignment', 'collection'], state)
})

export default connect(mapStateToProps)(Component)
