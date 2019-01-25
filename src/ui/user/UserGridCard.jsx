import React, {Component} from 'react'
import {is, map} from "ramda";

class UserGridCard extends Component{
  render () {
    const nurses = this.props.value
      if (is(Array, nurses)) return (
      <div>
        {map(nurse => <UserGridCard {...this.props} value={nurse} key={nurse.id}/>, nurses)}
      </div>
    )
    return <span>{nurses.name}</span>
  }
}

export default UserGridCard
