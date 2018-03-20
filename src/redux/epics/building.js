import Building from "../../models/building"
import {Observable} from 'rxjs'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/delay'
import blisseyApi from "../../service/api/blissey-api.service"
import notification from "../../service/notification/"
import {prop, propOr} from 'ramda'


const model = new Building()
const getNewBuilding = prop(`new${model.name}`)
const getDetails = propOr('server error', 'details')

export default (action$, store) =>
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
      .catch(error => {
        notification.error(`${model.name} was not saved. Error: ${getDetails( error.xhr.response )}`)
        return Observable.of({
          type: `PERSIST_${model.name.toUpperCase()}_REJECTED`,
          payload: error.xhr.response,
          error: true
        })
      })
    )
