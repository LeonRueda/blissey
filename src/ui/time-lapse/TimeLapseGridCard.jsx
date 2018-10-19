import React, {Component} from 'react'
import {is, map} from "ramda";
import moment from "moment";

class TimeLapseGridCard extends Component{
  render () {
    const {value: {startDate, endDate}} = this.props
    return <div>
      {is(Object, this.props.value ) && `${renderDate(startDate)} - ${renderDate(endDate)}`}
      {is(Array, this.props.value ) && map(val => <TimeLapseGridCard {...{...this.props, value: val}}/>, this.props.value)}
    </div>
  }
}

export default TimeLapseGridCard

const renderDate = date => moment(date).format('DD/MM')
