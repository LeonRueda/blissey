import Service from "../../models/service"
import {updateModel, newModel, fetchModel, deleteModel} from './general-model'


const service = new Service()

export const updateService = updateModel(service)

export const newService = newModel(service)

export const fetchServices = fetchModel(service)

export const deleteService = deleteModel(service)
