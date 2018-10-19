import Planning from '../../models/planning'
import generalReducer from './general-model'

const model = new Planning()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    default:
      return generalReducer(newState, action, model)
  }
}
