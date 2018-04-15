
class ModalService {
  setChannel (channel$) {
    this.channel$ = channel$
  }

  warning (message = '', actionName, action) {
    this.channel$.next({
      type: 'warning',
      message,
      action,
      actionName
    })
  }
}

const service = new ModalService()

export default service
