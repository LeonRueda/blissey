import React, {Component} from 'react'
import {Row, Column} from '../grid'
import Button from '../button'
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
              {attribute.type === "string" && <input type="text" className={"np-input text-input"} id={"txt-" + attribute.name}/>}
              {attribute.type === "autocomplete" && <Select {...attribute.params}/>}
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
