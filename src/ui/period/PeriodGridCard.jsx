import React from 'react'

export default props => {
  const period = props.value
  return <span>{period.name}</span>
}
