import GeneralModel from './general-model'
import {contains, intersection, pathOr, propEq} from "ramda";

const PLANNER = 'planner'

class Planner extends GeneralModel{
  name = PLANNER;
  attributes = [
    {name: "id", hide: true},
    {name: "name", label: "Name", type: "string"},
    {name: 'timeLapse', label: 'Fechas', type:'time-lapse'},
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
        filter: services => user => intersection(user.services, services).length > 0,
        filterByState: state => pathOr([], ['services'], state)
      }
    }
  ];
  gridOptions = {
    showTable: true
  }

  constructor () {
    super()
  }
}

export default Planner

export const isPlanner = propEq('name', PLANNER)
