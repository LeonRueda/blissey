import {createStore} from 'redux'
import reducers from './reducers'

const initialState = {building:{name: "hola"}};

const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store
