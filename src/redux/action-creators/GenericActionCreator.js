class GenericActionCreator {
  constructor( model ) {
    this.model = model
    this.update = this.update.bind(this)
  }

  update ( payload ) {
    return {
      type: `UPDATE_NEW_${ this.model.name.toUpperCase() }`,
      model: payload
    }
  }
}

export default GenericActionCreator
