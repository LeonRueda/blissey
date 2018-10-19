import React, {Component} from 'react'
import {is, map} from "ramda";

class UserGridCard extends Component{
  render () {
    return <div>
      {is(Object, this.props.value ) && this.props.value.name}
      {is(Array, this.props.value ) && map(val => <UserGridCard {...{...this.props, value: val}}/>, this.props.value)}
    </div>
  }
}

export default UserGridCard
