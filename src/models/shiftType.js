import GeneralModel from './general-model'
class ShiftType extends GeneralModel{
  name = 'shiftType';
  attributes = [
    {name: "id", hide: true},
    {name: "name", label: "Name", type: "string"},
    {name: "letterCode", label: "Letter Code", type: "string"},
    {name: "workLoad", label: "Hours", type: "number"}
  ]
}

export default ShiftType
