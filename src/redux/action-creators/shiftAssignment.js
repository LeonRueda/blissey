export const saveShiftAssignation = ({serviceId, day, shiftType, nurseTitle, val}) => ({
  type: 'SET_ASSIGN_TO_SERVICE',
  serviceId,
  day,
  shiftType,
  nurseTitle,
  val
})
