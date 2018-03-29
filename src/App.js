import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import Home from './components/containers/Home'

const App = ({ store }) => (
  <Provider store={store}>
    <Home />
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
