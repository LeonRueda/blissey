import React, {Component} from 'react'

export default props => {
  const [title] = props.value
  console.log(props)
  return <span>{title.label}</span>
}
