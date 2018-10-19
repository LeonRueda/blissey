class GenericActionCreator {
  constructor( model ) {
    this.model = model
    this.updateNew = this.updateNew.bind(this)
    this.persist = this.persist.bind(this)
    this.update = this.update.bind(this)
  }

  updateNew ( payload ) {
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

  update () {
    return {
      type: `PERSIST_UPDATED_${ this.model.name.toUpperCase() }`,
      model: this.model
    }
  }

  loadCollection () {
    return {
      type: `LOAD_${ this.model.name.toUpperCase() }_COLLECTION`
    }
  }

  fetchCollection(model) {
    return {
      type: `LOAD_${ model.toUpperCase() }_COLLECTION`
    }
  }
}

export default GenericActionCreator
