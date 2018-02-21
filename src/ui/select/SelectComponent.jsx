import React, {Component} from 'react'
import Input from '../input'
import {Subject} from 'rxjs'
import SelectList from './SelectListComponent'
import SelectedList from './SelectedListComponent'
import {uniqBy, prop} from 'ramda'

class Select extends Component{
  query$ = new Subject()

  constructor ( props ) {
    super ( props )
    this.state = {
      filteredCollection: [],
      selectedCollection: this.props.selectedCol,
      selectedIndex: -1,
      query: ''
    }
    this.query$
      .filter( ({key}) => {
        if ( key === "Enter" ) {
          if (this.state.selectedIndex > -1) this.select()
          return false;
        } else if ( key === "ArrowUp" ) {
          this.previousItem()
          return false;
        } else if (key === "ArrowDown") {
          this.nextItem()
          return false;
        }
        return true;
      })
      .filter(value => value.query.length > 2 )
      .map( value => value.query )
      .subscribe(value => {
        return this.filter( value )
      })
  }

  select () {
    if ( this.state.selectedIndex < 0 ) return false
    const selected = this.state.filteredCollection[this.state.selectedIndex]
    const selectedCollection = uniqBy(prop('id'), [...this.state.selectedCollection, selected])
    this.props.onSelect({collection: selectedCollection, val: selected})
    this.clean(selectedCollection)
  }

  clean (selectedCollection) {
    this.setState({
      selectedCollection: selectedCollection,
      filteredCollection: [],
      selectedIndex: -1,
      query:''
    })
  }

  previousItem () {
    this.setState({selectedIndex: this.state.selectedIndex >= 1 ? this.state.selectedIndex - 1 : this.state.filteredCollection.length - 1})
  }

  nextItem () {
    this.setState({selectedIndex: this.state.selectedIndex + 1 < this.state.filteredCollection.length ? this.state.selectedIndex + 1 : 0 })
  }

  filter ( query ) {
    this.setState({
      filteredCollection : this.props.collection
        .filter( item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1 )
    })
  }

  onkeyUp (evt) {
    this.setState({query: evt.target.value})
    this.query$.next({query: evt.target.value, key: evt.key})
  }

  render () {
    return <div className="select">
      <SelectedList collection={this.state.selectedCollection}/>
      <Input
        placeholder={this.props.placeholder}
        value={this.state.query}
        handleChange={(evt) => this.onkeyUp(evt)}
        onKeyUp={(evt) => this.onkeyUp(evt)}/>
      <SelectList collection={this.state.filteredCollection} selected={this.state.selectedIndex}/>
    </div>
  }
}

export default Select
