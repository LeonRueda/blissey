const root = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://chansey.herokuapp.com'

export const API_URL = {
  root: root,
  building: `${root}/building`,
  user: `${root}/user`
}
