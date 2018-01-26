import React from 'react'
import {Row, Column} from '../grid'
import Button from '../button'
import Input from '../input'
import __ from '../../i18n'
import Select from '../select'

export default (props) => {
  return (
  <form>
    <div className="container-fluid new-model-container">
      {
        props.model.attributes.map( (attribute) => (
          !attribute.hide && <Row key={attribute.name}>
            <Column classes="hide"><label htmlFor={"txt-" + attribute.name}>{attribute.label}</label></Column>
            <Column >
              {attribute.type === "string" && <Input id={"txt-" + attribute.name} placeholder={attribute.label} onKeyUp={val => updateModel({attribute: attribute.name, value: val})}/>}
              {attribute.type === "autocomplete" && <Select {...attribute.params} onSelect={} collection={[{name: "servicio2", label: "Servicio 2", id: 3}, {name: "servicio", label: "Servicio", id: 1}, {name: "urgencias", label: "Urgencias", id: 2}]}/>}
            </Column>
          </Row>
        ))
      }
      <Row classes="justify-content-end">
        <Column classes="col-sm-6 col-md-3"><Button>{__("Save")}</Button></Column>
        <Column classes="col-sm-6 col-md-3"><Button>{__("Cancel")}</Button></Column>
      </Row>
    </div>
  </form>
)}
