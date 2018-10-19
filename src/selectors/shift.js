import {pathOr} from 'ramda'

export const getStatePlannerShifts = (plannerId, state) => pathOr([], ['shift', 'planner', plannerId])(state)
