import GeneralModel from './general-model'
class Planner extends GeneralModel{
  name = 'planner';
  attributes = [
    {name: "id", hide: true},
    {name: "name", label: "Name", type: "string"},
  ];

  constructor () {
    super()
  }
}

export default Planner
