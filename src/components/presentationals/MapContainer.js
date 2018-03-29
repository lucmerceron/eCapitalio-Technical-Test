import React from 'react'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap } from 'react-google-maps'

import InformativeDirection from './InformativeDirection'

import './MapContainer.css'

const ROADMAP = window.google.maps.MapTypeId.ROADMAP

class MapContainer extends React.Component {
  constructor() {
    super()

    this.determineZoomAndCenter = this.determineZoomAndCenter.bind(this)
    this.map = null
  }
  componentDidUpdate() {
    this.determineZoomAndCenter()
  }
  /* Determine where to center & zoom */
  determineZoomAndCenter() {
    const { departureLatLng, arrivalLatLng, departureStation, arrivalStation } = this.props

    const points = [
      departureLatLng,
      arrivalLatLng,
      { lat: departureStation.lat, lng: departureStation.lng },
      { lat: arrivalStation.lat, lng: arrivalStation.lng }
    ]

    if (points.some(point => !point.lat || !point.lng)) return

    const bounds = new window.google.maps.LatLngBounds()

    points.forEach(point => bounds.extend(point))

    this.map.fitBounds(bounds)
    this.map.panToBounds(bounds)
  }

  render() {
    const { directions } = this.props

    return (
      <GoogleMap
        ref={map => (this.map = map)}
        defaultZoom={12}
        defaultCenter={{ lat: 48.8534, lng: 2.3488 }}
        mapTypeId={ROADMAP}
      >
        <InformativeDirection directions={directions.departureToStationDirections} color="blue" />
        <InformativeDirection directions={directions.stationToStationDirections} color="red" />
        <InformativeDirection directions={directions.stationToArrivalDirections} color="blue" />
      </GoogleMap>
    )
  }
}

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
