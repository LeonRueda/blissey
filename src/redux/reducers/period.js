import Period from '../../models/period'
import generalReducer from './general-model'

const model = new Period()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    default:
      return generalReducer(newState, action, model)
  }
}
