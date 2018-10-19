import {combineReducers} from 'redux'
import building from './building'
import service from './service'
import title from './title'
import user from "./user"
import shiftType from "./shiftType"
import shift from "./shift"
import shiftAssignment from "./shiftAssignment"
import planner from "./planner"
import planning from "./planning"
import period from "./period"

export default combineReducers({
  building,
  service,
  title,
  user,
  shift,
  shiftType,
  shiftAssignment,
  planner,
  planning,
  period
})
