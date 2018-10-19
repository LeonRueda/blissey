import Component from './CrudComponent'
import {connect} from 'react-redux'
import {pathOr} from 'ramda'

const mapStateToProps = (state, ownProps) => ({
  newModelState: pathOr({}, [ownProps.model.name, `new${ownProps.model.name}`], state),
  collection: pathOr([], [`${ownProps.model.name}`, 'collection'], state)
})

export default connect(mapStateToProps)(Component)
