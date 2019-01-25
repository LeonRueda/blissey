import GeneralModel from './general-model'
import {contains, pathOr, propOr} from 'ramda'
import {filterByServicePredicate, filterUserByTitleAndService} from './user'

const PLANNING = 'planning'

class Planning extends GeneralModel{
  name = PLANNING;
  attributes = [
    {name: "id", hide: true},
    {name: "name", label: "Name", type: "string"},
    {name: 'period', label: 'Period', type: 'autocomplete', params: {base: 'period'}},
    {name: 'building', label: 'Building', type: 'autocomplete', params: {base: 'building'}},
    {name: 'services', label: 'Services', type: 'multiselect',
      params: {
        base: 'service',
        filter: services => service => contains(service, services),
        filterByState: state => pathOr([], ['building', 'services'], state)
      }
    },
    {name: 'nurses', label: 'Nurses', type: 'multiselect',
      params: {
        base: 'user',
        filter: filterByServicePredicate,
        filterByState: state => ({
          services: pathOr([], ['services'], state)
        })
      }
    }
  ];

  constructor () {
    super()
  }
}

export default Planning
