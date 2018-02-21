import React from 'react'
import Switch from "react-router-dom/es/Switch"
import Route from "react-router-dom/es/Route"
import Building from './building'
import LogIn from './log-in/index'

export default () => <Switch>
    <Route path='/building' component={Building}/>
    <Route path='/log-in' component={LogIn}/>
</Switch>
