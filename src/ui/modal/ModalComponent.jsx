import React, {Component} from 'react'
import {Subject} from 'rxjs'
import modalService from '../../service/modal'
import __ from '../../i18n'

class ModalComponent extends Component{
  channel$ = new Subject()
  constructor(props) {
    super(props)
    modalService.setChannel(this.channel$)
    this.state = {
      show: false,
      type: 'success',
      message: '',
      actionName: __('Accept')
    }
    this.modal = ('#general-modal')

    this.channel$
      .subscribe( message => {
        this.modal = ('#general-modal')
        this.modal.modal('toggle')
        this.action = message.action
        this.setState({
          ...message
        })
      })
  }

  fireAction () {
    this.action()
    this.modal.modal('toggle')
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
            <p>{this.state.message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={() => this.fireAction()}>{this.state.actionName}</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  }
}


export default ModalComponent
