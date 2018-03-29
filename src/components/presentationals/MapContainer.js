import React from 'react'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap } from 'react-google-maps'

import InformativeDirection from './InformativeDirection'

import './MapContainer.css'

const MapContainer = ({
  departureLatLng,
  arrivalLatLng,
  departureStation,
  arrivalStation,
  directions
}) => (
  <GoogleMap defaultZoom={12} defaultCenter={{ lat: 48.8534, lng: 2.3488 }}>
    <InformativeDirection directions={directions.departureToStationDirections} color="blue" />
    <InformativeDirection directions={directions.stationToStationDirections} color="red" />
    <InformativeDirection directions={directions.stationToArrivalDirections} color="blue" />
  </GoogleMap>
)

MapContainer.propTypes = {
  departureLatLng: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  arrivalLatLng: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  departureStation: PropTypes.shape({
    name: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    nbEbike: PropTypes.number,
    distance: PropTypes.number
  }),
  arrivalStation: PropTypes.shape({
    name: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    nbFreeEDock: PropTypes.number,
    distance: PropTypes.number
  }),
  directions: PropTypes.shape({
    departureToStationDirections: PropTypes.object,
    stationToStationDirections: PropTypes.object,
    stationToArrivalDirections: PropTypes.object
  }).isRequired
}

export default withGoogleMap(MapContainer)
