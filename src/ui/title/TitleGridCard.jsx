import React, {Component} from 'react'

export default props => {
  const [title] = props.value
  return <span>{title.label}</span>
}
