import {newBuilding, fetchBuildings, updateBuilding, deleteBuilding} from './building'
import {newService, fetchServices, updateService, deleteService} from './service'
import {newUser, fetchUsers, updateUser, deleteUser} from './user'

import { combineEpics } from 'redux-observable';

export default combineEpics(
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
