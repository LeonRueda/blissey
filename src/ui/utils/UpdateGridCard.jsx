import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {pathOr} from 'ramda'

const getModelId = pathOr('', ['value', 'id'])

const UpdateGridCard = props => {
  return (
    <Link to={`/planner/${getModelId(props)}`} >
      <i className="material-icons grid-action-icon"
         key={props.key}>
        autorenew
      </i>
    </Link>
  )
}

export default connect()(UpdateGridCard)
