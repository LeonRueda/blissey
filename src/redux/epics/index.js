import {newBuilding, fetchBuildings, updateBuilding} from './building'


import { combineEpics } from 'redux-observable';

export default combineEpics(
  newBuilding,
  fetchBuildings,
  updateBuilding
)
