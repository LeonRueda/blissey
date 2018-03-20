class CrudCommands {
  constructor () {
    this.commandList = [
      '+'
    ]
  }

  instance (observable$) {
    document.getElementsByTagName('body')[0].onkeyup = (evt) => {
      if ( evt.target.localName === "body" &&  this.commandList.indexOf(evt.key) > -1 )
        observable$.next( this.execCommand(evt.key) )
    }
  }

  teardown () {
    document.getElementsByTagName('body')[0].onkeyup = null
  }

  execCommand ( command ) {
    switch ( command ) {
      case '+':
      return 'showNewModel'
    }
  }
}

  export default CrudCommands
