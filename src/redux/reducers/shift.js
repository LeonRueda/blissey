import Shift from '../../models/shift'
import generalReducer from './general-model'

const model = new Shift()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    case `SET_${model.name.toUpperCase()}_BY_PLANNER_COLLECTION`:
      return {
        ...newState,
        planner: {
          [action.plannerId]: action.shifts
        }
      }
    default:
      return generalReducer(newState, action, model)
  }
}
