class GenericActionCreator {
  constructor( model ) {
    this.model = model
    this.update = this.update.bind(this)
    this.persist = this.persist.bind(this)
  }

  update ( payload ) {
    return {
      type: `UPDATE_NEW_${ this.model.name.toUpperCase() }`,
      model: payload
    }
  }

  persist () {
    return {
      type: `PERSIST_NEW_${ this.model.name.toUpperCase() }`,
      model: this.model
    }
  }
}

export default GenericActionCreator
