import GeneralModel from './general-model'
import {contains, intersection, pathOr, propEq, propOr, where} from "ramda";

const PLANNER = 'planner'

const filterUserByTitleAndService = ({services: stateServices, title: stateTitle}) => {
  return where({
    services: services => intersection(services, stateServices).length > 0,
    title: propEq('name', stateTitle.name)
  })
}

export const isPlanner = propEq('name', PLANNER)

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
}

export default Planner
