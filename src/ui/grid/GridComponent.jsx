import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import GridCards from './GridCards'
import {indexOf, insert, isNil, map, path, pathOr} from 'ramda'

const isDetailGrid = pathOr(false, ['gridProperties', 'detail'])
const isActionableGrid = pathOr(true, ['gridProperties', 'actions'])
const showDetail = pathOr(false, ['detail', 'show'])

const getActionItems = (model) => {
  return [
    {name: 'edit', label: 'Edit'},
    {name: 'delete', label: 'Delete'}
  ]
}

class Grid extends Component {
  formatCell (attributeName, value) {
    const Formatter = GridCards.getComponent(this.props.model.name, attributeName)
    if (Formatter) return <Formatter model={this.props.model} value={value} key={`${attributeName} - ${value.id}`} />
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
    return map( item => <GridRow key={item.id}
                                 onDetail={() => this.onDetail(item, indexOf(item, this.props.collection))}
                                 offDetail={() => this.offDetail()}>
      {this.generateColumns(item)}{isActionableGrid(this.props.model) ? this.getActionsColumn(item) : ''}
      </GridRow>)
  }

  onDetail (model, index) {
    if ( showDetail(this.state) ) return this.setState({detail: {show: false, index: null, model: null}})
    this.setState({detail: {show: true, index, model}})
  }

  offDetail () {
    this.setState({detail: {index: null, model: null}})
  }

  generateColumns (row) {
    return this.getMapColumnsFn(row)(this.props.model.attributes)
  }

  generateRows () {
    const rows = this.mapRows()(this.props.collection)
    return  isDetailGrid(this.props.model) ? this.getDetailedRows(rows) : rows
  }

  getDetailedRows(rows) {
    const Detail = this.props.detailComponent
    return isNil(this.getDetailIndex()) ? rows : insert(
      this.getDetailIndex() + 1,
      <Detail model={this.getDetailModel()} />,
      rows
    )
  }

  getDetailIndex () {
    return path(['detail', 'index'], this.state)
  }

  getDetailModel () {
    return path(['detail', 'model'], this.state)
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
    return <div className='grid'>{this.generateGridHeader()}{this.generateRows()}</div>
  }
}

export default Grid

export const Row = props => <div className={`row ${ props.classes || '' }`}>{props.children}</div>

export const Column = props => <div className={`col ${ props.classes || ''}`}>{props.children}</div>

export const GridHeader = props => <div  className={`row grid-header ${ props.classes || '' }`}>{props.children}</div>

const witDetails = (RowComponent) => props => <RowComponent><ShowDetailsColumn onDetail={props.onDetail}/>{props.children}</RowComponent>

const witDetailsHeader = (RowComponent) => props => <RowComponent><Column>-</Column>{props.children}</RowComponent>

class ShowDetailsColumn extends Component{
  constructor (props) {
    super(props)
    this.state = {show: false}
  }

  toggle () {
    this.setState({show: !this.state.show})
  }

  render () {
    return <Column>
      {!this.state.show && <i className="material-icons grid-action-icon"
         key={this.props.key}
         onClick={() => {
           this.toggle()
           return this.props.onDetail()
         }}>
        keyboard_arrow_down
      </i>}
      {this.state.show && <i className="material-icons grid-action-icon"
                              key={this.props.key}
                              onClick={() => {
                                this.toggle()
                                this.props.offDetail()
                              }}>
        keyboard_arrow_up
      </i>}
    </Column>
  }
}
