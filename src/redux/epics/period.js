import Period from "../../models/period"
import {updateModel, newModel, fetchModel, deleteModel} from './general-model'


const period = new Period()

export const updatePeriod = updateModel(period)

export const newPeriod = newModel(period)

export const fetchPeriods = fetchModel(period)

export const deletePeriod = deleteModel(period)
