import GeneralModel from './general-model'
class Shift extends GeneralModel{
  name = 'shift';
  attributes = [
    {name: "id", hide: true},
    {name: "date", label: "Date", type: "string"},
    {name: "service", label: "Service", type: 'autocomplete', params: {base: 'service'}},
    {name: "shiftType", label: "Type", type: 'autocomplete', params: {base: 'shiftType'}},
  ];

  constructor () {
    super()
  }
}

export default Shift
