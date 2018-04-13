import React, {Component} from 'react'
import {Subject} from 'rxjs'
import modalService from '../../service/modal'
import $ from 'jquery'
import bootstrap from 'bootstrap'

class ModalComponent extends Component{
  channel$ = new Subject()
  constructor(props) {
    super(props)
    modalService.setChannel(this.channel$)
    this.state = {
      show: false,
      type: 'success',
      message: ''
    }

    this.channel$
      .do( message => {
        $('#general-modal').modal('toggle')
        this.setState({
          ...message,
          show: true
        })
      })
      .delay(5000)
      .subscribe(() => this.setState({show: false}))
  }

  render () {
    return <div className="modal" tabIndex="-1" role="dialog" id="general-modal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">Save changes</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  }
}


export default ModalComponent
