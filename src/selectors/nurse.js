import {pathOr} from 'ramda'

export const getStateNurses = pathOr([], ['user', 'collection'])
