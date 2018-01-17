import React from 'react'
import Switch from "react-router-dom/es/Switch"
import Route from "react-router-dom/es/Route"
import Building from './building'

export default () => <Switch>
    <Route path='/building' component={Building}/>
</Switch>
