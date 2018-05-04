import {combineReducers} from 'redux'
import building from './building'
import service from './service'
import title from './title'
import user from "./user"
import shiftType from "./shiftType"
import shift from "./shift"
import planner from "./planner"

export default combineReducers({
  building,
  service,
  title,
  user,
  shift,
  shiftType,
  planner
})
