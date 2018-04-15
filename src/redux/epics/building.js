import Building from "../../models/building"
import {Observable} from 'rxjs'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/delay'
import blisseyApi from "../../service/api/blissey-api.service"
import notification from "../../service/notification/"
import {prop, propOr, path} from 'ramda'


const model = new Building()
const getNewBuilding = prop(`new${model.name}`)
const getDetails = propOr('server error', 'details')
const getModelId = path(['model', 'id'])

const dispatchErrorAction = error => {
  notification.error(`${model.name} was not saved. Error: ${getDetails( error.xhr.response )}`)
  return Observable.of({
    type: `PERSIST_${model.name.toUpperCase()}_REJECTED`,
    payload: error.xhr.response,
    error: true
  })
}

export const updateBuilding = (action$, store) =>
  action$
    .ofType(`PERSIST_UPDATED_${model.name.toUpperCase()}`)
    .mergeMap(() => blisseyApi.conf( model.name )
      .patch( getNewBuilding( store.getState() ) )
      .map(response => {
        notification.success(`${model.name} successfully saved`)
        return {
          type: `PERSIST_UPDATE_${model.name.toUpperCase()}_SUCCESSFULLY`,
          response: response.response
        }
      })
      .catch(dispatchErrorAction)
    )

export const newBuilding = (action$, store) =>
  action$
    .ofType(`PERSIST_NEW_${model.name.toUpperCase()}`)
    .mergeMap(() => blisseyApi.conf( model.name )
      .post( getNewBuilding( store.getState() ) )
      .map(response => {
        notification.success(`${model.name} successfully saved`)
        return {
          type: `PERSIST_${model.name.toUpperCase()}_SUCCESSFULLY`,
          response
        }
      })
      .catch(dispatchErrorAction)
    )

export const fetchBuildings = (action$, store) => action$
  .ofType(`LOAD_${ model.name.toUpperCase() }_COLLECTION`)
  .mergeMap(() => blisseyApi.conf( model.name )
    .get()
    .map(response => {
      return {
        type: `SET_${model.name.toUpperCase()}_COLLECTION`,
        collection: prop('response', response)
      }
    })
    .catch(error => {
      notification.error(`${model.name} was not fetched. Error: ${getDetails( error.xhr.response )}`)
      return Observable.of({
        type: `PERSIST_${model.name.toUpperCase()}_REJECTED`,
        payload: error.xhr.response,
        error: true
      })
    })
  )

export const deleteBuilding = (action$, store) => action$
  .ofType(`DELETE_${model.name.toUpperCase()}`)
  .mergeMap(( action ) => {
    return blisseyApi.conf( model.name )
      .delete( getModelId(action) )
      .map(response => {
        notification.success(`${model.name} successfully deleted`)
        return {
          type: `DELETE_${model.name.toUpperCase()}_SUCCESSFULLY`,
          response: response.response
        }
      })
      .catch(error => {
        notification.error(`${model.name} was not deleted. Error: ${getDetails( error.xhr.response )}`)
        return Observable.of({
          type: `DELETE_${model.name.toUpperCase()}_REJECTED`,
          payload: error.xhr.response,
          error: true
        })
      })
  })