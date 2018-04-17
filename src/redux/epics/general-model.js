import blisseyApi from "../../service/api/blissey-api.service";
import notification from "../../service/notification";
import {path, prop, propOr} from "ramda";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/delay'

const getDetails = propOr('server error', 'details')
const getModelId = path(['model', 'id'])

const dispatchErrorAction = model => error => {
  notification.error(`${model.name} was not saved. Error: ${getDetails( error.xhr.response )}`)
  return Observable.of({
    type: `PERSIST_${model.name.toUpperCase()}_REJECTED`,
    payload: error.xhr.response,
    error: true
  })
}

export const updateModel = model => (action$, store) =>
  action$
    .ofType(`PERSIST_UPDATED_${model.name.toUpperCase()}`)
    .mergeMap(() => blisseyApi.conf( model.name )
      .patch( path([model.name, `new${model.name}`] )( store.getState() ) )
      .map(({response}) => {
        notification.success(`${model.name} successfully saved`)
        return {
          type: `PERSIST_UPDATE_${model.name.toUpperCase()}_SUCCESSFULLY`,
          response
        }
      })
      .catch(dispatchErrorAction(model))
    )

export const newModel = model => (action$, store) =>
  action$
    .ofType(`PERSIST_NEW_${model.name.toUpperCase()}`)
    .mergeMap(() => blisseyApi.conf( model.name )
      .post( path([model.name, `new${model.name}`] )( store.getState() ) )
      .map(({response})=> {
        notification.success(`${model.name} successfully saved`)
        return {
          type: `PERSIST_${model.name.toUpperCase()}_SUCCESSFULLY`,
          response
        }
      })
      .catch(dispatchErrorAction)
    )

export const fetchModel = model => (action$, store) => action$
  .ofType(`LOAD_${ model.name.toUpperCase() }_COLLECTION`)
  .mergeMap(() => {
    return blisseyApi.conf( model.name )
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
    }
  )

export const deleteModel = model => (action$, store) => action$
  .ofType(`DELETE_${model.name.toUpperCase()}`)
  .mergeMap(( action ) => {
    return blisseyApi.conf( model.name )
      .delete( getModelId(action) )
      .map(({response}) => {
        notification.success(`${model.name} successfully deleted`)
        return {
          type: `DELETE_${model.name.toUpperCase()}_SUCCESSFULLY`,
          response
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
