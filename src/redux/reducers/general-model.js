import {findIndex, prop, propEq, propOr, remove} from "ramda";


const removeById = (index, collection) => remove(findIndex(propEq('id', index), collection), 1, collection)

export default (newState, action, model) => {

  switch(action.type) {
    case `UPDATE_NEW_${model.name.toUpperCase()}`:
      newState[`new${model.name}`][action.model.attribute] = action.model.value
      return newState
    case `DELETE_NEW_MODEL_${model.name.toUpperCase()}`:
      newState[`new${model.name}`] = {}
      return newState
    case `CREATE_NEW_MODEL_${model.name.toUpperCase()}`:
      newState[`new${model.name}`] = model.getDefaultModel()
      newState.collection = newState.collection || []
      return newState
    case `PERSIST_NEW_${model.name.toUpperCase()}`:
      newState.collection = newState.collection || []
      return newState
    case `PERSIST_${model.name.toUpperCase()}_SUCCESSFULLY`:
      const newModel = {...prop(`new${model.name}`, newState), id: prop('id', action.response)}
      newState.collection.push(newModel)
      newState[`new${model.name}`] = {}
      return newState
    case `PERSIST_${model.name.toUpperCase()}_REJECTED`:
      // TODO @Leon higlight validation with server response!
      return newState
    case `SET_${model.name.toUpperCase()}_COLLECTION`:
      newState.collection = propOr([], 'collection', action)
      return newState
    case `EDIT_${model.name.toUpperCase()}`:
      newState[`new${model.name}`] = {
        ...action.model
      }
      return newState
    case `PERSIST_UPDATE_${model.name.toUpperCase()}_SUCCESSFULLY`:
      const index = findIndex(propEq('id', action.response.id))(newState.collection);
      newState.collection[index] = {...newState[`new${model.name}`]}
      newState[`new${model.name}`] = {}
      return newState
    case `DELETE_${model.name.toUpperCase()}_SUCCESSFULLY`:
      newState.collection = removeById(action.response.id, newState.collection)
      return newState
    default:
      return newState
  }
}
