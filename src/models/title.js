import GeneralModel from './general-model'

class Title extends GeneralModel {
  name = 'title'
  attributes = [
    {name: 'id', hide: true},
    {name: 'name', label: 'Name', type: 'string'},
  ];
}

export default Title
