import Shift from "../../models/shift"
import {updateModel, newModel, fetchModel, deleteModel, getDetails} from './general-model'
import blisseyApi from '../../service/api/blissey-api.service'
import {prop} from 'ramda'
import notification from '../../service/notification'
import {Observable} from 'rxjs'


const shift = new Shift()

export const updateShift = updateModel(shift)

export const newShift = newModel(shift)

export const fetchShifts = fetchModel(shift)

export const deleteShift = deleteModel(shift)

export const fetchPlannerShifts = (action$) => action$
  .ofType(`LOAD_${ shift.name.toUpperCase() }_BY_PLANNER_COLLECTION`)
  .mergeMap((action) => {
      return blisseyApi.conf( shift.name )
        .get(`/by-planner/${action.plannerId}`)
        .map(response => {
          return {
            type: `SET_${shift.name.toUpperCase()}_BY_PLANNER_COLLECTION`,
            shifts: prop('response', response),
            plannerId: action.plannerId
          }
        })
        .catch(error => {
          notification.error(`${shift.name} was not fetched. Error: ${getDetails( error.xhr.response )}`)
          return Observable.of({
            type: `PERSIST_${shift.name.toUpperCase()}_REJECTED`,
            payload: error.xhr.response,
            error: true
          })
        })
    }
  )
