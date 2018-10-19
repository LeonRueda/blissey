import React from 'react'
import {connect} from 'react-redux'

const EditGridCard = props => {
  return (
    <i className="material-icons grid-action-icon"
       key={props.key}
       onClick={() => props.dispatch({
         type: `EDIT_${props.model.name.toUpperCase()}`,
         model: props.value
       })}>
      mode_edit
    </i>
  )
}

export default connect()(EditGridCard)
