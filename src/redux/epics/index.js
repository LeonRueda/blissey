import {newBuilding, fetchBuildings, updateBuilding, deleteBuilding} from './building'
import {newService, fetchServices, updateService, deleteService} from './service'
import {newTitle, fetchTitles, updateTitle, deleteTitle} from './title'
import {newUser, fetchUsers, updateUser, deleteUser} from './user'

import { combineEpics } from 'redux-observable';

export default combineEpics(
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
