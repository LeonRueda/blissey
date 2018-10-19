import {Observable} from "rxjs/Rx";
import {find, isNil, pathOr, propEq, propOr} from "ramda";
import blisseyApi from "../../service/api/blissey-api.service";
import notification from "../../service/notification";
import {ShiftAssignment} from "../../models";
import {fetchModel} from "./general-model";

const shiftAssignment = new ShiftAssignment()

export const fetchShiftsAssignment = fetchModel(shiftAssignment)

export const persistShiftAssignment = action$ => action$
  .ofType('SET_ASSIGN_TO_SERVICE')
  .map(({serviceId}) => ({
    type: 'PERSIST_ASSIGN_TO_SERVICE',
    serviceId
  }))

export const saveShiftAssignment = (action$, store) =>
  action$
    .ofType('PERSIST_ASSIGN_TO_SERVICE')
    .mergeMap(saveAssignment(store))

const saveAssignment = store => action => {
  const collection = pathOr([], ['shiftAssignment', 'collection'], store.getState())
  const assignment = find(propEq('serviceId', `${action.serviceId}`), collection)
  if ( isNil( propOr( null, 'id', assignment ) ) ) return createAssignment(assignment)
  return updateAssignment(assignment)
}

const createAssignment = assignment => blisseyApi.conf( shiftAssignment.name )
    .post( assignment )
    .map(({response})=> {
      notification.success(`Shifts successfully saved`)
      return {
        type: `PERSIST_${shiftAssignment.name.toUpperCase()}_ASSIGNMENT_SUCCESSFULLY`,
        response
      }
    })
    .catch(dispatchErrorAction(shiftAssignment))

const updateAssignment = assignment => blisseyApi.conf( shiftAssignment.name )
  .patch( assignment )
  .map(({response})=> {
    notification.success(`Shifts successfully saved`)
    return {
      type: `PERSIST_${shiftAssignment.name.toUpperCase()}_ASSIGNMENT_SUCCESSFULLY`,
      response
    }
  })
  .catch(dispatchErrorAction(shiftAssignment))

const dispatchErrorAction = model => error => {
  notification.error(`${model.name} was not saved. Error: ${getDetails( error.xhr.response )}`)
  return Observable.of({
    type: `PERSIST_${model.name.toUpperCase()}_ASSIGNMENT_REJECTED`,
    payload: error.xhr.response,
    error: true
  })
}

const getDetails = propOr('server error', 'details')
