import GeneralModel from './general-model'
import {find, propEq} from 'ramda'

class User extends GeneralModel {
  name = 'user'
  attributes = [
    {name: 'id', hide: true},
    {name: 'active', label: 'Active', type: 'boolean', default: true},
    {name: 'title', label: 'Title', type: 'autocomplete', default: [], params: {base: 'title'}},
    {name: 'name', label: 'Name', type: 'string'},
    {name: 'email', label: 'Email', type: 'string'},
    {name: 'password', label: 'Password', type: 'string', hide: true, default: 'demo1234'},
    {name: 'services', label: 'Services', type: 'multiselect', params: {base: 'service'}}
  ];

  constructor () {
    super()
  }
}

export default User

export const getNurseInfo = (nurses, nurseId) => find(propEq('id', nurseId), nurses)
