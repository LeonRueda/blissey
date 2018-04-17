import React, {Component} from 'react'
import {is, map} from 'ramda'

const SingleServiceGridCard = props => <span key={props.service.id}><i className="material-icons" style={{color: props.service.color, width: '2rem'}}>local_hospital {props.service.name}</i></span>

const mapServices = map(service => <SingleServiceGridCard key={`${service.id}`} service={service}/>)

class ServiceGridCard extends Component {
  constructor (props) {
    super()
    this.state = {
      services: props.value
    }
  }

  render () {
    return is(Array, this.state.services) ? <span>{mapServices(this.state.services)}</span>:
      <SingleServiceGridCard service={this.state.services} key={`${this.state.services.id}`}/>
  }
}


export default ServiceGridCard
