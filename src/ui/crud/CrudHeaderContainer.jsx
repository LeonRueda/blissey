import Component from './CrudHeaderComponent'
import {connect} from 'react-redux'
import {propOr} from 'ramda'

const mapStateToProps = (state, ownProps) => ({
  newModelState: propOr({}, `new${ownProps.name}`, state)
})

export default connect(mapStateToProps)(Component)
