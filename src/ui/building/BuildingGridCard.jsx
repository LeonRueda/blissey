import React, {Component} from 'react'
import {is, map} from "ramda";

class BuildingGridCard extends Component{
    render () {
        return <div>
          {is(Object, this.props.value ) && this.props.value.name}
          {is(Array, this.props.value ) && map(val => <BuildingGridCard {...{...this.props, value: val}}/>, this.props.value)}
        </div>
    }
}

export default BuildingGridCard
