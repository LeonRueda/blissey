import Service from '../../models/service'
import generalReducer from './general-model'

const model = new Service()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    default:
      return generalReducer(newState, action, model)
  }
}
