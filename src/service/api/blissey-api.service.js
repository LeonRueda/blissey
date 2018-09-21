import {ajax} from "rxjs/observable/dom/ajax";
import {API_URL} from "../../config";


class API {
  constructor(conf) {
    this.actualModel = ''
  }

  post(data) {
    return ajax({
      url: API_URL[this.actualModel],
      crossDomain: true,
      withCredentials: true,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      hasContent: true,
      body: data
    })
  }

  patch(data) {
    return ajax({
      url: `${API_URL[this.actualModel]}/${data.id}`,
      crossDomain: true,
      withCredentials: true,
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      hasContent: true,
      body: data
    })
  }

  get (path = '') {
    return ajax({
      url: API_URL[this.actualModel] + path
      ,
      crossDomain: true,
      withCredentials: true,
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
  }

  delete (id) {
    return ajax({
      url: `${API_URL[this.actualModel]}/${id}`,
      crossDomain: true,
      withCredentials: true,
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
  }

  conf (model) {
    this.actualModel = model
    return this
  }
}

const config = {}
const mainApi = new API(config)

export default mainApi
export const post = mainApi.post
export const conf = mainApi.conf
