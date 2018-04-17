import {combineReducers} from 'redux'
import building from './building'
import service from './service'
import user from "./user";

export default combineReducers({
  building,
  service,
  user
})
