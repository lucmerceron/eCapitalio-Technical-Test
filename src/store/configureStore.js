import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from '../reducers/rootReducer'

const middlewares =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : applyMiddleware(thunk, createLogger())

export default function configureStore(preloadedState = {}) {
  return createStore(rootReducer, preloadedState, middlewares)
}
