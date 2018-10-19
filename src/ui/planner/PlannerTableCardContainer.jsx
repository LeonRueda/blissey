import Component from './PlannerTableCard'
import {connect} from 'react-redux'
import {pathOr} from 'ramda'

const mapStateToProps = (state) => ({
  collections: {
    shiftAssignment: pathOr([], ['shiftAssignment', 'collection'], state)
  }
})

export default connect(mapStateToProps)(Component)
