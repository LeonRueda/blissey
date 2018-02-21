import Building from "../../models/building"
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/delay'
import {ajax}  from 'rxjs/observable/dom/ajax'
import {API_URL} from '../../config'

const model = new Building()

export default (action$, store) =>
  action$
    .ofType(`PERSIST_NEW_${model.name.toUpperCase()}`)
    .mergeMap(action => {
      return ajax({
        url: API_URL.building,
        crossDomain: true,
        withCredentials: true,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        hasContent: true,
        body: store.getState().newbuilding
      })
        .map(response => {
          console.log(response)
          return {
            type: `hola`,
            response
          }
        })
    })
    .delay(1000)
    .mapTo({
      type: `SUCCESSFULLY_PERSIST_NEW_${model.name.toUpperCase()}`
    })
