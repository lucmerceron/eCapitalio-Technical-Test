import React from 'react'
// import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'

const MapContainer = props => (
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: 41.852183, lng: -87.675462 }} />
)

MapContainer.propTypes = {}

export default withGoogleMap(MapContainer)
