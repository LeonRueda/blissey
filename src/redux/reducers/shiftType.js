import ShiftType from '../../models/shiftType'
import generalReducer from './general-model'

const model = new ShiftType()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    default:
      return generalReducer(newState, action, model)
  }
}
