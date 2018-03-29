import React from 'react'
import PropTypes from 'prop-types'
import PlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'

import './AutocompleteInput.css'

class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      departure: '',
      departureId: '',
      arrival: '',
      arrivalId: '',
      bothDestinationsSelected: 0 // 0: none selected, 1: one selected, 2 or more: both selected
    }
    // TODO: add the verification for Paris & its surrounding
    this.onDepartureChange = departure => this.setState({ departure })
    this.onArrivalChange = arrival => this.setState({ arrival })
    this.onDepartureSelected = (address, placeId) => {
      this.setState(prevState => ({
        bothDestinationsSelected: prevState.bothDestinationsSelected + 1,
        departure: address,
        departureId: placeId
      }))
    }
    this.onArrivalSelected = (address, placeId) => {
      this.setState(prevState => ({
        bothDestinationsSelected: prevState.bothDestinationsSelected + 1,
        arrival: address,
        arrivalId: placeId
      }))
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit() {
    const { departureId, arrivalId } = this.state
    const { handleBikeSearch } = this.props

    // Search the lat & lng of both location
    Promise.all([geocodeByPlaceId(departureId), geocodeByPlaceId(arrivalId)])
      .then(results => Promise.all([getLatLng(results[0][0]), getLatLng(results[1][0])]))
      .then(results => ({
        departureLatLng: results[0],
        arrivalLatLng: results[1]
      }))
      .then(handleBikeSearch)
      .catch(error => console.error('Error', error))
  }

  render() {
    const { departure, arrival, bothDestinationsSelected, departureId, arrivalId } = this.state
    const { handleBikeSearch } = this.props

    return (
      <div className="bike-my-way-form">
        <PlacesAutocomplete
          inputProps={{
            value: departure,
            onChange: this.onDepartureChange,
            placeholder: 'Where are you ?'
          }}
          onSelect={this.onDepartureSelected}
          classNames={{
            input: 'bike-my-way-input',
            autocompleteContainer: 'bike-my-way-input-container'
          }}
          debounce={200}
        />
        <PlacesAutocomplete
          inputProps={{
            value: arrival,
            onChange: this.onArrivalChange,
            placeholder: 'Where are you going ?'
          }}
          onSelect={this.onArrivalSelected}
          classNames={{
            input: 'bike-my-way-input',
            autocompleteContainer: 'bike-my-way-input-container'
          }}
          debounce={200}
        />
        <button
          type="submit"
          disabled={bothDestinationsSelected < 2}
          onClick={this.handleFormSubmit}
        >
          Find my Bike !
        </button>
      </div>
    )
  }
}

AutocompleteInput.propTypes = {
  handleBikeSearch: PropTypes.func.isRequired
}

export default AutocompleteInput
