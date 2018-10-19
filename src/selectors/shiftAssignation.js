import {find, propEq} from 'ramda'

export const getServiceFromState = (serviceId, state) => find(propEq('id', serviceId), state.service.collection)
