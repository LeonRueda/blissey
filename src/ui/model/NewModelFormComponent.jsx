import React, {Component} from 'react'
import {Row, Column} from '../grid'
import Button from '../button'
import Input from '../input'
import __ from '../../i18n'
import MultiSelect, {Select} from '../select'
import TimeLapse from '../time-lapse'
import ActionBuilder from '../../redux/action-creators'
import {isNil, propOr, mapObjIndexed, filter, is, map, pathOr} from 'ramda'
import GridCards from "../grid/GridCards";

const showTable = pathOr(false, ['gridOptions', 'showTable'])

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
    if (is(Array, newValue.value)) this.setState({[newValue.attribute + "Ids"]: map(i => i.id, newValue.value)})
    if (is(Object, newValue.value)) this.setState({[newValue.attribute + "Id"]: newValue.value.id})
    return this.props.dispatch(this.updateNewModel(newValue))
  }

  saveModel() {
    if (isNil(this.state.id)) return this.props.dispatch(this.persistModel())
    return this.props.dispatch(this.updateModel())
  }

  getAttributeCollection ({params}) {
    const rawCollection = propOr([], params.base, this.props.collections)
    if ( isNil( params.filter ) ) return rawCollection
    if ( isNil( params.filterByState ) ) return filter(params.filter, rawCollection)
    return filter(params.filter(params.filterByState(this.state)), rawCollection)
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
                   onSelect={({val}) =>
                     this.updateAttribute({attribute: attribute.name, value: val})}
                   collection={this.getAttributeCollection(attribute)}
                   selected={this.props.newModel[attribute.name]}/>
  }

  getMultiselect(attribute) {
    return <MultiSelect {...attribute.params}
                   placeholder={attribute.label}
                   onSelect={({collection}) =>
                     this.updateAttribute({attribute: attribute.name, value: collection})}
                   collection={this.getAttributeCollection(attribute)}
                   selectedCol={this.props.newModel[attribute.name]}/>
  }

  getTimeLapse (attribute) {
    return <TimeLapse onSelect={val => this.updateAttribute({attribute: attribute.name, value: val})}/>
  }

  getModelTableComponent () {
    const Table = GridCards.getTableComponent(this.props.model.name)
    return Table ? <Table newModelState={this.state} /> : null
  }

  getModelTable () {
    if ( showTable(this.props.model)) return this.getModelTableComponent()
  }

  render() {
    return (
      <form>
        {this.getModelTable()}
        <div className="container-fluid new-model-container">
          {
            this.props.model.attributes.map((attribute) => (
              !attribute.hide && <Row key={attribute.name}>
                <Column classes="hide">
                  <label htmlFor={"txt-" + attribute.name}>{attribute.label}</label>
                </Column>
                <Column>
                  {attribute.type === "string" && this.getInput(attribute)}
                  {attribute.type === "number" && this.getInput(attribute)}
                  {attribute.type === "autocomplete" && this.getAutocomplete(attribute)}
                  {attribute.type === "multiselect" && this.getMultiselect(attribute)}
                  {attribute.type === "time-lapse" && this.getTimeLapse(attribute)}
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
