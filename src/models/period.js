import GeneralModel from './general-model'

export const PERIOD = 'period'

class Period extends GeneralModel {
  name = PERIOD
  attributes = [
    {name: 'id', hide: true},
    {name: 'name', label: 'Name', type: 'string'},
  ];
}

export default Period
