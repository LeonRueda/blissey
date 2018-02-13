import React from 'react'
import Component from './NewModelFormComponent'
import {connect} from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    newModel: state['new' + ownProps.model.name]
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch//TODO dont pass dispatch on connect
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
