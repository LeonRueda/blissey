import GeneralModel from './general-model'
import {find, map, pathOr, propEq, propSatisfies, toLower, values} from 'ramda'
import {getNurseInfo} from './user'
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

export const mapAssignedShifts = (assignedPlannerShifts, plannerShifts, shiftTypes, nurses) => map(item => {
  const shiftInfo = find(propEq('id', item.id))(plannerShifts)
  return {
    ...shiftInfo,
    nurse: getNurseInfo(nurses, item.nurseId),
    shiftType: findShiftType(shiftInfo, shiftTypes)
  }
}, values(assignedPlannerShifts))

export const getPlannerShifts = pathOr([], ['planner', 'shifts'])

const findShiftType = (shift, shiftTypes) => find(
  propEq('name', shift.shiftType.name),
  shiftTypes
)
