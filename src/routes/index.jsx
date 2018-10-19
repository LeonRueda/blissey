import React from 'react'
import { Switch, Route } from 'react-router'
import Building from './building'
import Service from './service'
import User from './user'
import Settings from './settings'
import {Planner, PlannerVisualization}from './planner'
import Shift from './shift/index'
import LogIn from './log-in/index'

export default () => <Switch>
    <Route path='/building' component={Building}/>
    <Route path='/service' component={Service}/>
    <Route path='/user' component={User}/>
    <Route path='/settings' component={Settings}/>
    <Route exact path='/planner' component={Planner}/>
    <Route exact path='/planner/:id' component={PlannerVisualization}/>
    <Route path='/shift' component={Shift}/>
    <Route path='/log-in' component={LogIn}/>
</Switch>
