import Planner from '../../models/planner'
import generalReducer from './general-model'

const model = new Planner()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    case 'SET_PLANNER_STATE':
      return {
        ...newState,
        onGoing: {
          ...newState.onGoing,
          [action.planner.id]: action.planner.data()
        }
      }
    default:
      return generalReducer(newState, action, model)
  }
}
