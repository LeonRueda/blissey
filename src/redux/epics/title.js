import Title from "../../models/title"
import {updateModel, newModel, fetchModel, deleteModel} from './general-model'


const title = new Title()

export const updateTitle = updateModel(title)

export const newTitle = newModel(title)

export const fetchTitles = fetchModel(title)

export const deleteTitle = deleteModel(title)
