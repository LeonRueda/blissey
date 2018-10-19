import React from 'react'
import {connect} from 'react-redux'
import modalService from '../../service/modal'
import __ from '../../i18n'

const DeleteGridCard = props => {
  const deleteModel = () => props.dispatch({
    type: `DELETE_${props.model.name.toUpperCase()}`,
    model: props.value
  })
  return (
    <i className="material-icons grid-action-icon"
       key={props.key}
       onClick={() => modalService.warning(__("Are you sure you want to delete this building?"), __('Delete'), deleteModel)}>
      delete
    </i>
  )
}

export default connect()(DeleteGridCard)
