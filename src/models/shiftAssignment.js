import GeneralModel from './general-model'
class ShiftAssignment extends GeneralModel{
  name = 'shiftAssignment';
  attributes = [
    {name: "id", hide: true},
    {name: "serviceId", hide: true},
    {name: "assignments", hide: true},
  ]
}

export default ShiftAssignment
