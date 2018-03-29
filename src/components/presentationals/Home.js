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
    const { searchClosestStations, departureStation, arrivalStation } = this.props
    const { departureLatLng, arrivalLatLng } = this.state
    return (
      <div className="bike-my-way">
        Bike My Way
        <AutocompleteInput
          handleBikeSearch={({ departureLatLng, arrivalLatLng }) => {
            this.setState({ departureLatLng, arrivalLatLng }, () => {
              searchClosestStations(departureLatLng, arrivalLatLng)
            })
          }}
        />
        <MapContainer
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className="bike-my-way-map-container" />}
          mapElement={<div style={{ height: `100%` }} />}
          departureStation={departureStation}
          arrivalStation={arrivalStation}
          departureLatLng={departureLatLng}
          arrivalLatLng={arrivalLatLng}
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
  searchClosestStations: PropTypes.func.isRequired
}

export default Home
