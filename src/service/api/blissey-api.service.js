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
