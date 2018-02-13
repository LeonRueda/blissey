import Building from '../../models/building'

const model = new Building()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    case "UPDATE_NEW_BUILDING":
      newState[`new${model.name}`][action.model.attribute] = action.model.value
      return newState
    case `NEW_MODEL_${model.name.toUpperCase()}`:
      newState[`new${model.name}`] = {
        name: "",
        services: []
      }
      return newState
  }
}
