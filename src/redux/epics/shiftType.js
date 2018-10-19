import ShiftType from "../../models/shiftType"
import {updateModel, newModel, fetchModel, deleteModel} from './general-model'


const shiftType = new ShiftType()

export const updateShiftType = updateModel(shiftType)

export const newShiftType = newModel(shiftType)

export const fetchShiftTypes = fetchModel(shiftType)

export const deleteShiftType = deleteModel(shiftType)

