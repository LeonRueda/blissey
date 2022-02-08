import GeneralModel from './general-model'

class Service extends GeneralModel {
  name = 'service'
  attributes = [
    {name: 'id', hide: true},
    {name: 'name', label: 'Name', type: 'string'},
    {name: 'color', label: 'Color', type: 'string'},
    {name: 'beds', label: 'Beds', type: 'number'},
    {name: 'bedsByNurse', label: 'Beds by Nurse', type: 'number'}
  ]
}

export const getDefaultNurses = (service, nurseTitle) => nurseTitle === 'jefe' ? 1 : Math.ceil(service.beds / service.bedsByNurse)

export default Service
