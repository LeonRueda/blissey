import React from 'react'
const Button = props => <button type="button" onClick={props.onClick} className={`np-button input-${props.type} ${props.classes}`}>{props.children}</button>

export default Button
export const ButtonNew = props => <Button {...props} classes={`new ${props.classes}`}>{props.children}</Button>

