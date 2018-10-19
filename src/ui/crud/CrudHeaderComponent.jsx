import React from 'react'
import {isEmpty} from "ramda";

import {ButtonNew} from '../button'

export default (props) => (
  <header className={'crud-header'}>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <span className={'section-title'}>{props.name} - ({props.quantity})</span>
        </div>
        <div className="col-md-3">

        </div>
        {props.showNewModel && <div className="col-md-3">
          {isEmpty(props.newModelState) && <ButtonNew type={'medium'} classes={'pull-right'} onClick={props.showNewModel}>New </ButtonNew>}
        </div>}
      </div>
    </div>
  </header>
)
