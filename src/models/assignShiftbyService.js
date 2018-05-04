import GeneralModel from './general-model'
class AssignShiftbyService extends GeneralModel{
  name = 'assignShiftbyService';
  attributes = [
    {name: "id", hide: true},
    {name: "serviceId", hide: true},
    {name: "serviceName", label: "Service Name", type: "string"},
    {name: "shifts", label: "Shifts"}
  ];
  gridProperties = {
    detail: true,
    actions: false
  };

  constructor () {
    super()
  }
}

export default AssignShiftbyService
