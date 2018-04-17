import Building from "../../models/building"
import {updateModel, newModel, fetchModel, deleteModel} from './general-model'


const building = new Building()

export const updateBuilding = updateModel(building)

export const newBuilding = newModel(building)

export const fetchBuildings = fetchModel(building)

export const deleteBuilding = deleteModel(building)
