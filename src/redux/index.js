import {createStore, applyMiddleware, compose} from 'redux'
import reducers from './reducers'
import {createEpicMiddleware} from 'redux-observable'
import epics from './epics'

const initialState = {};

const epicMiddleware = createEpicMiddleware(epics)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, initialState, composeEnhancers( applyMiddleware(epicMiddleware) ));

export default store
