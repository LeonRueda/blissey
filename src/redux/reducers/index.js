import {combineReducers} from 'redux'
import building from './building'
import service from './service'
import title from './title'
import user from "./user";

export default combineReducers({
  building,
  service,
  title,
  user
})
