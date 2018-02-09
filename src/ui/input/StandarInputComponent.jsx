import React from 'react'

export default props => <input 
    type={props.type || "text"} 
    className="np-input text-input" 
    id={props.id} onKeyUp={props.onKeyUp} 
    placeholder={props.placeholder}/>
