import React from 'react'

export default (props) => (
  <header>
    <h1>{props.name} - ({props.quantity})</h1>
    <button onClick={props.showNewModel}>New </button>
  </header>
)
