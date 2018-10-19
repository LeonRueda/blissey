import Planner from "../../models/planner"
import {updateModel, newModel, fetchModel, deleteModel} from './general-model'


const planner = new Planner()

export const updatePlanner = updateModel(planner)

export const newPlanner = newModel(planner)

export const fetchPlanners = fetchModel(planner)

export const deletePlanner = deleteModel(planner)

