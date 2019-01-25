import Planning from "../../models/planning"
import {updateModel, newModel, fetchModel, deleteModel} from './general-model'


const planning = new Planning()

export const updatePlanning = updateModel(planning)

export const newPlanning = newModel(planning)

export const fetchPlannings = fetchModel(planning)

export const deletePlanning = deleteModel(planning)

