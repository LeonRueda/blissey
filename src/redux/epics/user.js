import User from "../../models/user"
import {updateModel, newModel, fetchModel, deleteModel} from './general-model'


const user = new User()

export const updateUser = updateModel(user)

export const newUser = newModel(user)

export const fetchUsers = fetchModel(user)

export const deleteUser = deleteModel(user)
