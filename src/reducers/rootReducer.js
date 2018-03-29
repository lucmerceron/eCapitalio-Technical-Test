import { combineReducers } from 'redux'
import velibStation from './velibStation'
import directions from './directions'

const rootReducer = combineReducers({ velibStation, directions })

export default rootReducer
