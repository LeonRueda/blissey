import GeneralModel from './general-model'

class Service extends GeneralModel {
  name = 'service'
  attributes = [
    {name: 'id', hide: true},
    {name: 'name', label: 'Name', type: 'string'},
    {name: 'color', label: 'Color', type: 'string'}
  ];

  constructor () {
    super()
  }
}

export default Service
