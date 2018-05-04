import Planner from '../../models/planner'
import generalReducer from './general-model'

const model = new Planner()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    default:
      return generalReducer(newState, action, model)
  }
}
