import Shift from '../../models/shift'
import generalReducer from './general-model'

const model = new Shift()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    default:
      return generalReducer(newState, action, model)
  }
}
