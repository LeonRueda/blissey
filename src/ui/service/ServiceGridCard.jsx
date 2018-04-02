import React, {Component} from 'react'
import {is, map} from 'ramda'

const SingleServiceGridCard = props => <i className="material-icons" style={{color: props.service.color, width: '2rem'}} key={props.service.id}>local_hospital {props.service.name}</i>
const mapServices = map(service => <SingleServiceGridCard key={service.id} service={service}/>)
class ServiceGridCard extends Component {
  constructor (props) {
    super()
    this.state = {
      services: props.value
    }
  }

  render () {
    return !is(Array, this.state.services) ? <SingleServiceGridCard service={this.state.services} key={this.state.services.id}/>:
      <span>{mapServices(this.state.services)}</span>
  }
}


export default ServiceGridCard
