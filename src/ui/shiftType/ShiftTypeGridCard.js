import React from 'react'

export default props => {
  const shiftType = props.value
  return <span>{shiftType.name}</span>
}
