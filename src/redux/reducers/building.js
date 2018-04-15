import Building from '../../models/building'
import {prop, propOr, propEq, findIndex, remove} from 'ramda'

const model = new Building()

const removeById = (index) => {
  return remove(findIndex(propEq('id', index)), 1)
}

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    case `UPDATE_NEW_${model.name.toUpperCase()}`:
      newState[`new${model.name}`][action.model.attribute] = action.model.value
      return newState
    case `DELETE_NEW_MODEL_${model.name.toUpperCase()}`:
      newState[`new${model.name}`] = {}
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
      const newModel = {...newState[`new${model.name}`], id: prop('id', action.response)}
      newState[model.name].collection.push(newModel)
      newState[`new${model.name}`] = {}
      return newState
    case `PERSIST_${model.name.toUpperCase()}_REJECTED`:
      // TODO @Leon higlight validation with server response!
      return newState
    case `SET_${model.name.toUpperCase()}_COLLECTION`:
      newState[model.name] = newState[model.name] || {}
      newState[model.name].collection = propOr([], 'collection', action)
      return newState
    case `EDIT_${model.name.toUpperCase()}`:
      newState[`new${model.name}`] = {
        ...action.model
      }
      return newState
    case `PERSIST_UPDATE_${model.name.toUpperCase()}_SUCCESSFULLY`:
      const index = findIndex(propEq('id', action.response.id))(newState[model.name].collection);
      newState[model.name].collection[index] = {...newState[`new${model.name}`]}
      newState[`new${model.name}`] = {}
      return newState
    case `DELETE_${model.name.toUpperCase()}_SUCCESSFULLY`:
      newState[model.name].collection = removeById(action.response.id)(newState[model.name].collection)
      return newState
    default:
      return newState
  }
}
