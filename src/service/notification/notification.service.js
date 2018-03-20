
class NotificationService {
  constructor () {
    message: 'hola mundo'
  }

  success (message, params) {
    this.message = message
    this.channel$.next({
      type: 'success',
      message,
      params
    })
  }

  error ( message, params ) {
    this.message = message
    this.channel$.next({
      type: 'danger',
      message,
      params
    })
  }

  setChannel (channel$) {
    this.channel$ = channel$
  }
}



const singletonNotification = new NotificationService()

export default singletonNotification
