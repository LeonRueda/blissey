import React, {Component} from 'react'
import Input from '../input'
import {Subject} from 'rxjs'
import SelectList from './SelectListComponent'

class Select extends Component{
  query$ = new Subject()

  constructor ( props ) {
    super ( props )
    this.state = {
      filteredCollection: [],
      selectedIndex: 0
    }
    this.query$
      .filter( ({key}) => {
        console.log(key)
        if ( key === "Enter" ) {
          this.select()
        } else if ( key === "ArrowUp" ) {
          this.previousItem()
          return false;
        } else if (key === "ArrowDown") {
          this.nextItem()
          return false;
        }
        return true;
      })
      .filter(value => {
        return value.query.length > 2
      })
      .map( value => value.query )
      .subscribe(value => {
        return this.filter( value )
      })
  }

  select () {
    this.props.onSelect(this.state.filteredCollection[this.state.selectedIndex])
  }

  previousItem () {
    this.setState({selectedIndex: this.state.selectedIndex >= 1 ? this.state.selectedIndex - 1 : this.state.filteredCollection.length - 1})
  }

  nextItem () {
    this.setState({selectedIndex: this.state.selectedIndex + 1 < this.state.filteredCollection.length ? this.state.selectedIndex + 1 : 0 })
  }

  filter ( query ) {
    this.setState( {
      filteredCollection : this.props.collection
        .filter( item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1 )
    })
  }

  render () {
    return <div className="select">
      <Input placeholder={this.props.placeholder} onKeyUp={ ( evt ) => this.query$.next({query: evt.target.value, key: evt.key}) }/>
      <SelectList collection={this.state.filteredCollection} selected={this.state.selectedIndex}/>
    </div>
  }
}

export default Select
