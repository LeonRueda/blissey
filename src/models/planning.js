import GeneralModel from './general-model'

const PLANNING = 'planning'

class Planning extends GeneralModel{
  name = PLANNING
  attributes = [
    {name: "id", hide: true},
    {name: "name", label: "Name", type: "string"},
    {name: 'period', label: 'Period', type: 'autocomplete', params: {base: 'periods'}}
  ]
}

export default Planning
