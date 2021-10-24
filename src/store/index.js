import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import studentsReducer from './students'
import campusesReducer from './campuses'
import studentReducer from './student'
import campusReducer from './campus'

const reducer = combineReducers({
  students:studentsReducer,
  campuses:campusesReducer,
  student:studentReducer,
  campus:campusReducer 
})

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed:true}))
const store = createStore(reducer, middleware)
export default store