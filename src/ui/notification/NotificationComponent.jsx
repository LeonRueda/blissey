import React, {Component} from 'react'
import notificationService from '../../service/notification'
import {Subject} from 'rxjs'

class notifications extends Component{
  channel$ = new Subject()
  constructor() {
    super()
    notificationService.setChannel(this.channel$)
    this.state = {
      show: false,
      type: 'success',
      message: ''
    }

    this.channel$
      .do( message => {
        this.setState({
          ...message,
          show: true
        })
      })
      .delay(5000)
      .subscribe(() => this.setState({show: false}))
  }

  render () {
    return (
      <div className={`main-app-notification alert alert-${this.state.type}`} role="alert" style={{display: this.state.show ? "block" : "none"}}>
        {this.state.message}
      </div>
    )
  }
}


export default notifications
