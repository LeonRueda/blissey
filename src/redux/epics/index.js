import {newBuilding, fetchBuildings, updateBuilding, deleteBuilding} from './building'
import {newUser, fetchUsers, updateUser, deleteUser} from './user'


import { combineEpics } from 'redux-observable';

export default combineEpics(
  newUser,
  fetchUsers,
  updateUser,
  deleteUser,

  newBuilding,
  fetchBuildings,
  updateBuilding,
  deleteBuilding
)
