import React from 'react'

export default props => !!props.collection.length && <ul>
  {props.collection.map(
      (item, index) => (
        <li key={item.id} className={"select-option " + (index === props.selected ? "selected" : "")}>
          {item.label}
        </li>
      )
    )}
</ul>
