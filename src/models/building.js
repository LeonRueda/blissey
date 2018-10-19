import GeneralModel from './general-model'
class Building extends GeneralModel{
  name = 'building';
  attributes = [
    {name: "id", hide: true},
    {name: "name", label: "Name", type: "string"},
    {name: "services", label: "Services", type: "multiselect", params: {base: "service"}}
  ];

  constructor () {
    super()
  }
}

export default Building
