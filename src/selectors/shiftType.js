import {pathOr} from 'ramda'

export const getStateShiftTypes = pathOr([], ['shiftType', 'collection'])
