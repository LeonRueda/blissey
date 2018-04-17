import isNil from "ramda/es/isNil";

export default class GeneralModel {
  defaultByType (attribute) {
    return attribute.type === 'string' ? '' : attribute.type === 'autocomplete' ? [] : true
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
