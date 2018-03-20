import Building from '../../models/building'

const model = new Building()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    case `UPDATE_NEW_${model.name.toUpperCase()}`:
      newState[`new${model.name}`][action.model.attribute] = action.model.value
      return newState
    case `CREATE_NEW_MODEL_${model.name.toUpperCase()}`:
      newState[`new${model.name}`] = {
        name: "",
        services: []
      }
      newState.collection = newState.collection || []
      return newState
    case `PERSIST_NEW_${model.name.toUpperCase()}`:
      newState[model.name] = newState[model.name] || {}
      newState[model.name].collection = newState[model.name].collection || []
      return newState
    case `PERSIST_${model.name.toUpperCase()}_SUCCESSFULLY`:
      const newModel = {...newState[`new${model.name}`], id: action.response.id}
      newState[model.name].collection.push(newModel)
      newState[`new${model.name}`] = {}
      return newState
    case `PERSIST_${model.name.toUpperCase()}_REJECTED`:
      // TODO @Leon higlight validation with server response!
      return newState
    default:
      return newState
  }
}
