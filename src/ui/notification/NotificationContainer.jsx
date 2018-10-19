import component from './NotificationComponent'
import React from 'react'

const mapStateToProps = (state, ownProps) => {
  return {
    type: state.notification
  }
}

export default connect(mapStateToProps)(component)
