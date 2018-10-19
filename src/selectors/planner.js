import {path} from 'ramda'

export const getPlanner = (plannerId, state) => path(['planner', 'onGoing', plannerId], state)
