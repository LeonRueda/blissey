import {newBuilding, fetchBuildings, updateBuilding, deleteBuilding} from './building'


import { combineEpics } from 'redux-observable';

export default combineEpics(
  newBuilding,
  fetchBuildings,
  updateBuilding,
  deleteBuilding
)
