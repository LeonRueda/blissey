import React from 'react'
import Switch from "react-router-dom/es/Switch"
import Route from "react-router-dom/es/Route"
import Building from './building'
import Service from './service'
import User from './user'
import Settings from './settings'
import Planner from './planner/index'
import Shift from './shift/index'
import LogIn from './log-in/index'

export default () => <Switch>
    <Route path='/building' component={Building}/>
    <Route path='/service' component={Service}/>
    <Route path='/user' component={User}/>
    <Route path='/settings' component={Settings}/>
    <Route path='/planner' component={Planner}/>
    <Route path='/shift' component={Shift}/>
    <Route path='/log-in' component={LogIn}/>
</Switch>
