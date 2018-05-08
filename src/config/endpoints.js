const root = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://chansey.herokuapp.com'

export const API_URL = {
  root: root,
  building: `${root}/building`,
  service: `${root}/service`,
  title: `${root}/title`,
  user: `${root}/user`,
  planner: `${root}/planner`,
  shift: `${root}/shift`,
  shiftType: `${root}/shiftType`,
  shiftAssignment: `${root}/shiftAssignment`
}
