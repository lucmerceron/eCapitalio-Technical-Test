import React from 'react'
import PropTypes from 'prop-types'
import MapContainer from './MapContainer'
import AutocompleteInput from './AutocompleteInput'
import './Home.css'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      departureLatLng: {},
      arrivalLatLng: {}
    }
  }
  render() {
    const {
      searchClosestStationsAndDirections,
      departureStation,
      arrivalStation,
      directions
    } = this.props
    const { departureLatLng, arrivalLatLng } = this.state

    return (
      <div className="bike-my-way">
        <div className="bike-my-way-top-bar paper">
          <h1>Bike My Way</h1>
          <AutocompleteInput
            handleBikeSearch={({ departureLatLng, arrivalLatLng }) => {
              this.setState({ departureLatLng, arrivalLatLng }, () => {
                searchClosestStationsAndDirections(departureLatLng, arrivalLatLng)
              })
            }}
          />
        </div>
        <MapContainer
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className="bike-my-way-map-container paper" />}
          mapElement={<div style={{ height: `100%` }} />}
          departureLatLng={departureLatLng}
          arrivalLatLng={arrivalLatLng}
          departureStation={departureStation}
          arrivalStation={arrivalStation}
          directions={directions}
        />
      </div>
    )
  }
}

Home.propTypes = {
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
  }).isRequired,
  searchClosestStationsAndDirections: PropTypes.func.isRequired
}

export default Home
