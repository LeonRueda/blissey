import React, {Component} from 'react'
import {mapObjIndexed, sum, map, values} from 'ramda'

export default props => {
  const text = values(mapObjIndexed( (shifts, code) => {
    return `${ code }: ${sum(map(e => 1, shifts))}`
  }, props.value))
  console.log(text)
  return props.value && <span>
    {text}
  </span>
}
