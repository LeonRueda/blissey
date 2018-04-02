import Component from './CrudComponent'
import {connect} from 'react-redux'
import {propOr, pathOr} from 'ramda'

const mapStateToProps = (state, ownProps) => ({
  newModelState: propOr({}, `new${ownProps.model.name}`, state),
  collection: pathOr([], [`${ownProps.model.name}`, 'collection'], state)
})

export default connect(mapStateToProps)(Component)
