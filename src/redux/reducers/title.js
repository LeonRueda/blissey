import Title from '../../models/title'
import generalReducer from './general-model'

const model = new Title()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    default:
      return generalReducer(newState, action, model)
  }
}
