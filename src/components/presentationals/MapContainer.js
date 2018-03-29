import React from 'react'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox'

import InformativeDirection from './InformativeDirection'

import './MapContainer.css'

// Scoped to the module
const DirectionsService = new window.google.maps.DirectionsService()

class MapContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      departureToBikeDirections: null,
      bikeToDockDirections: null,
      dockToArrivalDirections: null
    }

    this.calculDirections = this.calculDirections.bind(this)
  }
  componentDidMount() {
    this.calculDirections()
  }
  componentDidUpdate() {
    this.calculDirections()
  }

  calculDirections() {
    const { departureLatLng, arrivalLatLng, departureStation, arrivalStation } = this.props

    if (departureLatLng && arrivalLatLng && departureStation && arrivalStation) {
      DirectionsService.route(
        {
          origin: departureLatLng,
          destination: {
            lat: departureStation.lat,
            lng: departureStation.lng
          },
          travelMode: window.google.maps.TravelMode.WALKING
        },
        (res, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              departureToBikeDirections: res
            })
          } else {
            console.error(`error fetching directions ${res}`)
          }
        }
      )
      DirectionsService.route(
        {
          origin: {
            lat: departureStation.lat,
            lng: departureStation.lng
          },
          destination: {
            lat: arrivalStation.lat,
            lng: arrivalStation.lng
          },
          travelMode: window.google.maps.TravelMode.BICYCLING
        },
        (res, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              bikeToDockDirections: res
            })
          } else {
            console.error(`error fetching directions ${res}`)
          }
        }
      )
      DirectionsService.route(
        {
          origin: { lat: arrivalStation.lat, lng: arrivalStation.lng },
          destination: arrivalLatLng,
          travelMode: window.google.maps.TravelMode.WALKING
        },
        (res, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              dockToArrivalDirections: res
            })
          } else {
            console.error(`error fetching directions ${res}`)
          }
        }
      )
    }
  }
  render() {
    const { departureToBikeDirections, bikeToDockDirections, dockToArrivalDirections } = this.state

    return (
      <GoogleMap defaultZoom={12} defaultCenter={{ lat: 48.8534, lng: 2.3488 }}>
        <InformativeDirection directions={departureToBikeDirections} color="blue" />
        <InformativeDirection directions={bikeToDockDirections} color="red" />
        <InformativeDirection directions={dockToArrivalDirections} color="blue" />
      </GoogleMap>
    )
  }
}

// TODO: Separate this into its own component

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
  })
}

export default withGoogleMap(MapContainer)
