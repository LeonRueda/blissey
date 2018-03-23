import React from 'react'
import {isEmpty} from "ramda";

export default (props) => (
  <header>
    <h1>{props.name} - ({props.quantity})</h1>
    {isEmpty(props.newModelState) && <button onClick={props.showNewModel}>New </button>}
  </header>
)
