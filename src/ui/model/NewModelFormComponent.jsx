import React, {Component} from 'react'
import {Row, Column} from '../grid'
import Button from '../button'
import Input from '../input'
import __ from '../../i18n'
import Select from '../select'
import ActionBuilder from '../../redux/action-creators'

const serviceCollection = [
  {name: "servicio3", label: "Servicio 3", id: 4},
  {name: "servicio2", label: "Servicio 2", id: 3},
  {name: "servicio", label: "Servicio", id: 1},
  {name: "urgencias", label: "Urgencias", id: 2}]

class NewModelFormComponent extends Component {
  constructor (props) {
    super(props)
    this.actionCreator = new ActionBuilder(this.props.model)
    this.updateModel = this.actionCreator.update
    this.persistModel = this.actionCreator.persist
  }

  render () {
    return (
      <form>
        <div className="container-fluid new-model-container">
          {
            this.props.model.attributes.map( (attribute) => (
              !attribute.hide && <Row key={attribute.name}>
                <Column classes="hide"><label htmlFor={"txt-" + attribute.name}>{attribute.label}</label></Column>
                <Column >
                  {attribute.type === "string" &&
                    <Input id={"txt-" + attribute.name}
                      placeholder={attribute.label}
                      onKeyUp={evt =>
                        this.props.dispatch(this.updateModel({attribute: attribute.name, value: evt.target.value}))}/>}
                  {attribute.type === "autocomplete" && <Select {...attribute.params}
                    placeholder={attribute.label}
                    onSelect={({collection}) => {
                      this.props.dispatch(this.updateModel({attribute: attribute.name, value: collection}))
                    }}
                    collection={serviceCollection}
                    selectedCol={this.props.newModel[attribute.name]}   />}
                </Column>
              </Row>
            ))
          }
          <Row classes="justify-content-end">
            <Column classes="col-sm-6 col-md-3">
              <Button onClick={() => this.props.dispatch(this.persistModel())}>{__("Save")}</Button>
            </Column>
            <Column classes="col-sm-6 col-md-3"><Button onClick={this.props.hideForm}>{__("Cancel")}</Button></Column>
          </Row>
        </div>
      </form>
    )
  }
}

export default NewModelFormComponent
