export const saveShiftAssignation = ({serviceId, day, shiftType, val}) => ({
  type: 'SET_ASSIGN_TO_SERVICE',
  serviceId,
  day,
  shiftType,
  val
})
