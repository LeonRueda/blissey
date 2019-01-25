import {deleteBuilding, fetchBuildings, newBuilding, updateBuilding} from './building'
import {deleteService, fetchServices, newService, updateService} from './service'
import {deleteTitle, fetchTitles, newTitle, updateTitle} from './title'
import {deletePeriod, fetchPeriods, newPeriod, updatePeriod} from './period'
import {deleteUser, fetchUsers, newUser, updateUser} from './user'
import {deletePlanner, fetchPlanners, newPlanner, updatePlanner} from './planner'
import {deletePlanning, fetchPlannings, newPlanning, updatePlanning} from './planning'
import {deleteShiftType, fetchShiftTypes, newShiftType, updateShiftType} from './shiftType'
import {deleteShift, fetchPlannerShifts, fetchShifts, newShift, updateShift} from './shift'
import {fetchShiftsAssignment, persistShiftAssignment, saveShiftAssignment} from './shiftAssignment'

import {combineEpics} from 'redux-observable';

export default combineEpics(
  fetchShiftsAssignment,
  saveShiftAssignment,
  persistShiftAssignment,

  newShift,
  fetchShifts,
  fetchPlannerShifts,
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

  newPlanning,
  fetchPlannings,
  updatePlanning,
  deletePlanning,

  newTitle,
  fetchTitles,
  updateTitle,
  deleteTitle,

  newPeriod,
  fetchPeriods,
  updatePeriod,
  deletePeriod,

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
