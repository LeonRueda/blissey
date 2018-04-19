import React, {Component} from 'react'
import {Row, Column} from '../grid'
import Button from '../button'
import Input from '../input'
import __ from '../../i18n'
import Select from '../select'
import ActionBuilder from '../../redux/action-creators'
import {isNil, propOr, mapObjIndexed} from 'ramda'

const collections = {
  service: [
    {name: "servicio3", label: "Servicio 3", id: 4},
    {name: "servicio2", label: "Servicio 2", id: 3},
    {name: "servicio", label: "Servicio", id: 1},
    {name: "urgencias", label: "Urgencias", id: 2}
  ],
  title: [
    {name: "enfJefe", label: "Enfermera Jefe", id: 4},
    {name: "servicio2", label: "Auxiliar de Enf.", id: 3}
  ]
}


class NewModelFormComponent extends Component {
  constructor(props) {
    super(props)
    this.actionCreator = new ActionBuilder(this.props.model)
    this.updateNewModel = this.actionCreator.updateNew
    this.persistModel = this.actionCreator.persist
    this.updateModel = this.actionCreator.update
    this.state = {...props.newModel}
    mapObjIndexed((value, key) => {
      this.props.dispatch(this.actionCreator.fetchCollection(key))
    }, this.props.collections)
  }

  updateAttribute(newValue) {
    this.setState({[newValue.attribute]: newValue.value})
    return this.props.dispatch(this.updateNewModel(newValue))
  }

  saveModel() {
    if (isNil(this.state.id)) return this.props.dispatch(this.persistModel())
    return this.props.dispatch(this.updateModel())
  }

  getInput(attribute) {
    return <Input id={"txt-" + attribute.name}
                  placeholder={attribute.label}
                  value={this.state[attribute.name]}
                  onKeyUp={evt => this.updateAttribute({attribute: attribute.name, value: evt.target.value})}
                  handleChange={evt => this.updateAttribute({attribute: attribute.name, value: evt.target.value})}/>
  }

  getAutocomplete(attribute) {
    return <Select {...attribute.params}
                   placeholder={attribute.label}
                   onSelect={({collection}) =>
                     this.updateAttribute({attribute: attribute.name, value: collection})}
                   collection={propOr([], attribute.params.base, this.props.collections)}
                   selectedCol={this.props.newModel[attribute.name]}/>
  }

  render() {
    return (
      <form>
        <div className="container-fluid new-model-container">
          {
            this.props.model.attributes.map((attribute) => (
              !attribute.hide && <Row key={attribute.name}>
                <Column classes="hide">
                  <label htmlFor={"txt-" + attribute.name}>{attribute.label}</label>
                </Column>
                <Column>
                  {attribute.type === "string" && this.getInput(attribute)}
                  {attribute.type === "autocomplete" && this.getAutocomplete(attribute)}
                </Column>
              </Row>
            ))
          }
          <Row classes="justify-content-end">
            <Column classes="col-sm-6 col-md-3">
              <Button onClick={() => this.saveModel()}>{__("Save")}</Button>
            </Column>
            <Column classes="col-sm-6 col-md-3">
              <Button onClick={this.props.hideForm}>{__("Cancel")}</Button>
            </Column>
          </Row>
        </div>
      </form>
    )
  }
}

export default NewModelFormComponent
