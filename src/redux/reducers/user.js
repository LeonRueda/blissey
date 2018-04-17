import User from '../../models/user'
import generalReducer from './general-model'

const model = new User()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    default:
      return generalReducer(newState, action, model)
  }
}
