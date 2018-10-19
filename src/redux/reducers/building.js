import Building from '../../models/building'
import generalReducer from './general-model'

const model = new Building()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    default:
      return generalReducer(newState, action, model)
  }
}
