import ShiftAssignment from '../../models/shiftAssignment'
import generalReducer from './general-model'
import {findIndex, lensPath, path, prop, propEq, set} from "ramda";

const model = new ShiftAssignment()

export default (state, action) => {
  const newState = {...state}

  switch(action.type) {
    case 'SET_ASSIGN_TO_SERVICE':
      const index = getAssignationIndex(newState, action.serviceId)
      return setAssignation(
        setServiceId(newState, index, action.serviceId),
        index,
        {...action}
      )
    case `PERSIST_${model.name.toUpperCase()}_ASSIGNMENT_SUCCESSFULLY`:
      return setId(
        newState,
        getAssignationIndex(newState, prop('serviceId', action.response)),
        prop('id', action.response)
      )
    default:
      return generalReducer(newState, action, model)
  }
}

const setId = (state, index, id) => set(lensPath(['collection', index, 'id']), id, state)
const setServiceId = (state, index, serviceId) => set(lensPath(['collection', index, 'serviceId']), `${serviceId}`, state)

const setAssignation = (state, index, {day, shiftType, nurseTitle, val}) => {
  return set(lensPath([
    'collection',
    index,
    'assignment',
    nurseTitle,
    day,
    shiftType
  ]), val, state)
}

const getAssignationIndex = (state, serviceId) => {
  const index = findIndex(propEq('serviceId', `${serviceId}`), prop('collection', state))
  return index < 0 ? path(['collection', 'length'], state) : index
}
