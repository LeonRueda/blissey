import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default (props) => (
  <div>
    {props.model.collection.map( item =>
      <Row key={item.id}>
        { getColumnValues( item ) }
      </Row>)}
  </div>
)

function getColumnValues( rowItem ) {
  const columns = []
  let index = 0
  for (let key in rowItem) {
    columns.push(<Column key={index++}>{rowItem[key]}</Column>)
  }
  return columns;
}

export const Row = props => <div className={`row ${ props.classes || '' }`}>{props.children}</div>

export const Column = props => <div className={`col ${ props.classes || ''}`}>{props.children}</div>
