import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import GridCards from './GridCards'
import {map, pathOr} from 'ramda'

const isDetailGrid = pathOr(false, ['gridProperties', 'detail'])
const isActionableGrid = pathOr(true, ['gridProperties', 'actions'])

const getActionItems = (model) => {
  return [
    {name: 'edit', label: 'Edit'},
    {name: 'delete', label: 'Delete'}
  ]
}

class Grid extends Component {
  formatCell (attributeName, value) {
    const Formatter = GridCards.getComponent(this.props.model.name, attributeName)
    if (Formatter) return <Formatter model={this.props.model} value={value}/>
    return value
  }

  mapActionItems (item) {
    return map( action => this.formatCell(action.name, item))
  }

  getActionsColumn (item) {
    return <Column>
      { this.mapActionItems(item)( getActionItems(this.props.model) ) }
    </Column>
  }

  getMapColumnsFn (row) {
    return map( attribute => {
    return <Column key={`${attribute.name}_${row.id}`} classes={attribute.hide ? 'hide' : ''}>
      {this.formatCell(attribute.name, row[attribute.name])}
    </Column>})
  }

  mapRows () {
    const GridRow = isDetailGrid(this.props.model) ? witDetails(Row) : Row
    return map( item => <GridRow key={item.id}>
      {this.generateColumns(item)}{isActionableGrid(this.props.model) ? this.getActionsColumn(item) : ''}
      </GridRow>)
  }

  generateColumns (row) {
    return this.getMapColumnsFn(row)(this.props.model.attributes)
  }

  generateRows () {
    return this.mapRows()(this.props.collection)
  }

  getActionsColumnHeader () {
    return <Column classes={'column-header'}>Actions</Column>
  }

  getMapColumnHeadersFn () {
    return map( attribute => <Column key={`${attribute.name}`} classes={`column-header ${attribute.hide ? 'hide' : ''}`}>
      {attribute.label}
    </Column>)
  }

  generateColumnHeaders () {
    return this.getMapColumnHeadersFn()(this.props.model.attributes)
  }

  generateGridHeader () {
    const GridHeaderRow = isDetailGrid(this.props.model) ? witDetailsHeader(GridHeader) : GridHeader
    return <GridHeaderRow>{this.generateColumnHeaders()}{isActionableGrid(this.props.model) ? this.getActionsColumnHeader() : ''}</GridHeaderRow>
  }

  render () {
    return <div>{this.generateGridHeader()}{this.generateRows()}</div>
  }
}

export default Grid

export const Row = props => <div className={`row ${ props.classes || '' }`}>{props.children}</div>

export const Column = props => <div className={`col ${ props.classes || ''}`}>{props.children}</div>

export const GridHeader = props => <div  className={`row grid-header ${ props.classes || '' }`}>{props.children}</div>

const witDetails = (RowComponent) => props => <RowComponent><ShowDetails />{props.children}</RowComponent>

const witDetailsHeader = (RowComponent) => props => <RowComponent><Column>-</Column>{props.children}</RowComponent>

const ShowDetails = props => <Column>
  <i className="material-icons grid-action-icon"
     key={props.key}
     onClick={() => props.onClick()}>
    keyboard_arrow_down
  </i>
</Column>
