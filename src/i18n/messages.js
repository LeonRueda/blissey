class Messages {
  constructor (mes) {
    this.messages = mes;
    this.get = this.get.bind(this);
  }

  get ( key ) {
    if ( this.messages.hasOwnProperty( key ) ) return this.messages[key]
    return key
  }
}

const messages = {
  //Buildng messages
  "building": "Lugar",


  //Basics messages

  "Save": "Guardar",
  "Cancel": "Cancelar"
}

const i18n = new Messages(messages)

export default i18n.get
