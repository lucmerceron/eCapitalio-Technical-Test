import React from 'react'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'

import './MapContainer.css'

// Scoped to the module
const DirectionsService = new window.google.maps.DirectionsService()

class MapContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      departureToBikeDirection: null,
      bikeToDockDirection: null,
      dockToArrivalDirection: null
    }

    this.calculDirections = this.calculDirections.bind(this)
  }
  componentDidMount() {
    this.calculDirections()
  }
  componentDidUpdate(lastProps) {
    if (lastProps !== this.props) this.calculDirections()
  }
  calculDirections() {
    const { departureLatLng, arrivalLatLng, velibStation } = this.props

    if (
      departureLatLng &&
      arrivalLatLng &&
      velibStation.departureStation &&
      velibStation.arrivalStation
    ) {
      DirectionsService.route(
        {
          origin: departureLatLng,
          destination: {
            lat: velibStation.departureStation.lat,
            lng: velibStation.departureStation.lng
          },
          travelMode: window.google.maps.TravelMode.WALKING
        },
        (res, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              departureToBikeDirection: res
            })
          } else {
            console.error(`error fetching directions ${res}`)
          }
        }
      )
      DirectionsService.route(
        {
          origin: {
            lat: velibStation.departureStation.lat,
            lng: velibStation.departureStation.lng
          },
          destination: {
            lat: velibStation.arrivalStation.lat,
            lng: velibStation.arrivalStation.lng
          },
          travelMode: window.google.maps.TravelMode.BICYCLING
        },
        (res, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              bikeToDockDirection: res
            })
          } else {
            console.error(`error fetching directions ${res}`)
          }
        }
      )
      DirectionsService.route(
        {
          origin: { lat: velibStation.arrivalStation.lat, lng: velibStation.arrivalStation.lng },
          destination: velibStation.arrivalLatLng,
          travelMode: window.google.maps.TravelMode.WALKING
        },
        (res, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              dockToArrivalDirection: res
            })
          } else {
            console.error(`error fetching directions ${res}`)
          }
        }
      )
    }
  }
  render() {
    const { departureToBikeDirection, bikeToDockDirection, dockToArrivalDirection } = this.state
    const { velibStation } = this.props

    return (
      <GoogleMap defaultZoom={12} defaultCenter={{ lat: 48.858093, lng: 2.294694 }}>
        {departureToBikeDirection && (
          <DirectionsRenderer
            options={{
              polylineOptions: {
                strokeColor: 'blue'
              }
            }}
            directions={departureToBikeDirection}
          />
        )}
        {bikeToDockDirection && (
          <DirectionsRenderer
            options={{
              polylineOptions: {
                strokeColor: 'red'
              }
            }}
            directions={bikeToDockDirection}
          />
        )}
        {dockToArrivalDirection && (
          <DirectionsRenderer
            options={{
              polylineOptions: {
                strokeColor: 'blue'
              }
            }}
            directions={dockToArrivalDirection}
          />
        )}
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
  velibStation: PropTypes.shape({
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
  }).isRequired
}

export default withGoogleMap(MapContainer)
