import React from 'react'

export default props => !!props.collection.length && <ul>
  {props.collection.map(
    (item, index) => (<li key={item.id} className={"selected-option"}><span><span className="delete" > X </span>{item.label}</span></li>)
  )}
</ul>
