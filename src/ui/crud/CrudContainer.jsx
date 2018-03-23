import Component from './CrudComponent'
import {connect} from 'react-redux'
import {propOr} from 'ramda'

const mapStateToProps = (state, ownProps) => ({
  newModelState: propOr({}, `new${ownProps.model.name}`, state)
})

export default connect(mapStateToProps)(Component)
