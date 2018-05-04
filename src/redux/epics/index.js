import {newBuilding, fetchBuildings, updateBuilding, deleteBuilding} from './building'
import {newService, fetchServices, updateService, deleteService} from './service'
import {newTitle, fetchTitles, updateTitle, deleteTitle} from './title'
import {newUser, fetchUsers, updateUser, deleteUser} from './user'
import {newPlanner, fetchPlanners, updatePlanner, deletePlanner} from './planner'
import {newShiftType, fetchShiftTypes, updateShiftType, deleteShiftType} from './shiftType'
import {newShift, fetchShifts, updateShift, deleteShift} from './shift'

import { combineEpics } from 'redux-observable';

export default combineEpics(
  newShift,
  fetchShifts,
  updateShift,
  deleteShift,

  newShiftType,
  fetchShiftTypes,
  updateShiftType,
  deleteShiftType,

  newPlanner,
  fetchPlanners,
  updatePlanner,
  deletePlanner,

  newTitle,
  fetchTitles,
  updateTitle,
  deleteTitle,

  newService,
  fetchServices,
  updateService,
  deleteService,

  newUser,
  fetchUsers,
  updateUser,
  deleteUser,

  newBuilding,
  fetchBuildings,
  updateBuilding,
  deleteBuilding
)
