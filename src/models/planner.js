import GeneralModel from './general-model'
import {contains, pathOr, propEq, propOr} from "ramda";
import {filterUserByTitleAndService} from './user'

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
    {name: 'nurseType', label: 'Title', type: 'autocomplete', params: { base: 'title' }},
    {name: 'nurses', label: 'Nurses', type: 'multiselect',
      params: {
        base: 'user',
        filter: filterUserByTitleAndService,
        filterByState: state => ({
          services: pathOr([], ['services'], state),
          title: propOr({}, 'nurseType', state)
        })
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
