import Shift from "../../models/shift"
import {updateModel, newModel, fetchModel, deleteModel} from './general-model'


const shift = new Shift()

export const updateShift = updateModel(shift)

export const newShift = newModel(shift)

export const fetchShifts = fetchModel(shift)

export const deleteShift = deleteModel(shift)

