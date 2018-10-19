import Component from './NewModelFormComponent'
import {connect} from 'react-redux'
import {path, mapObjIndexed, propOr} from 'ramda'

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    newModel: path([ownProps.model.name, `new${ownProps.model.name}`], state),
    collections: mapObjIndexed(propOr([], 'collection'), state)
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch//TODO dont pass dispatch on connect
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
