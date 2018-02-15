import Building from '../../models/building'

const model = new Building()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    case `UPDATE_NEW_${model.name.toUpperCase()}`:
      newState[`new${model.name}`][action.model.attribute] = action.model.value
      return newState
    case `NEW_MODEL_${model.name.toUpperCase()}`:
      newState[`new${model.name}`] = {
        name: "",
        services: []
      }
      newState.collection = newState.collection || []
      return newState
    case `PERSIST_NEW_${model.name.toUpperCase()}`:
      newState.collection.push(newState[`new${model.name}`])
      return newState
    case `SUCCESSFULLY_PERSIST_NEW_${model.name.toUpperCase()}`:
      newState[`new${model.name}`] = {}
      return newState
  }
}
