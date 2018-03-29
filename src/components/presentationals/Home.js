import React from 'react'
// import PropTypes from 'prop-types'
import MapContainer from './MapContainer'
import './Home.css'

const Home = props => (
  <div className="bike-my-way">
    Home view
    <MapContainer
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  </div>
)

Home.propTypes = {}

export default Home
