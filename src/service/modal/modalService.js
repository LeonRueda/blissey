
class ModalService {
  setChannel (channel$) {
    this.channel$ = channel$
  }

  warning (message = '', callback) {
    this.channel$.next({
      type: 'warning',
      message: message,
      action: callback
    })
  }
}

const service = new ModalService()

export default service
