import React, {Component} from 'react'
import Input from '../input'
import {Subject} from 'rxjs'
import SelectList from './SelectListComponent'
import SelectedItem from './SelectedItemComponent'
import {defaultTo, remove} from 'ramda'

class Select extends Component{
  query$ = new Subject()

  constructor ( props ) {
    super ( props )
    this.state = {
      selected: props.selected,
      filteredCollection: [],
      selectedIndex: -1,
      query: '',
      showList: true
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

  select ( index ) {
    const defaultToStateIndex = defaultTo(this.state.selectedIndex)
    const selectedIndex = defaultToStateIndex(index)
    if ( selectedIndex <= -1 ) return false
    const selected = this.state.filteredCollection[selectedIndex]

    this.props.onSelect({val: selected})
    this.clean(selected)
  }

  clean (selected) {
    this.setState({
      selected,
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
    const filteredCollection = this.props.collection
      .filter( item => item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 )
    this.setState({
      filteredCollection : filteredCollection,
      showList: filteredCollection.length > 0
    })
  }

  onkeyUp (evt) {
    this.setState({query: evt.target.value})
    this.query$.next({query: evt.target.value, key: evt.key})
  }

  hideList() {
    //this.setState({showList: false})
  }

  indexOnHover (index) {
    this.setState({selectedIndex: index})
  }

  unSelect (index) {
    this.setState({selectedCollection: remove(index, 1, this.state.selectedCollection)})
  }

  render () {
    return <div className="select">
      <SelectedItem
        selected={this.state.selected}
        unSelect={(index) => this.unSelect(index)}/>
      <Input
        onBlur={() => this.hideList()}
        placeholder={this.props.placeholder}
        value={this.state.query}
        handleChange={(evt) => this.onkeyUp(evt)}
        onKeyUp={(evt) => this.onkeyUp(evt)}/>
      {
        this.state.showList &&
        <SelectList
          collection={this.state.filteredCollection}
          selected={this.state.selectedIndex}
          onClick={(index) => this.select(index)}
          mouseHover={(index) => this.indexOnHover(index)}
        />
      }
    </div>
  }
}

export default Select
