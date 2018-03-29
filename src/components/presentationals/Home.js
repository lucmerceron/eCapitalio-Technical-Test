import React from 'react'
// import PropTypes from 'prop-types'
import MapContainer from './MapContainer'
import AutocompleteInput from './AutocompleteInput'
import './Home.css'

const Home = props => (
  <div className="bike-my-way">
    Bike My Way
    <AutocompleteInput />
    <MapContainer
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  </div>
)

Home.propTypes = {}

export default Home
