import React from 'react'
import {isEmpty} from 'ramda'

export default props => !isEmpty(props.selected) && <ul className={'selected'}>
  <li key={props.selected.id} className={"selected-option"}>
      <span><span className="delete" onClick={() => props.unSelect()}> X </span>{props.selected.name}</span>
  </li>
</ul>
