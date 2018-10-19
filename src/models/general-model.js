import { isNil } from 'ramda';

export default class GeneralModel {
  defaultByType (attribute) {
    return attribute.type === 'string' ? '' : attribute.type === 'autocomplete' ? {} : attribute.type === 'multiselect' ? [] : true
  }

  getDefaultModel () {
    const defaultModel = {}
    this.attributes.forEach( attribute => {
      if (attribute.hide && isNil(attribute.default)) return
      defaultModel[attribute.name] = attribute.default || this.defaultByType(attribute)
    })
    return defaultModel
  }
}
