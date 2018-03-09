import React from 'react'

export default props => !!props.collection.length && <ul className={'selected'}>
  {props.collection.map(
    (item, index) => (<li key={item.id} className={"selected-option"}>
      <span><span className="delete" onClick={() => props.unSelect(index)}> X </span>{item.label}</span>
    </li>)
  )}
</ul>
