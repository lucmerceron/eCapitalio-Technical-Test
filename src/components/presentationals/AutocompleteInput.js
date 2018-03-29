import React from 'react'
import PropTypes from 'prop-types'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import './AutocompleteInput.css'

class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      departure: '',
      arrival: '',
      bothDestinationsSelected: 0 // 0: none selected, 1: one selected, 2 or more: both selected
    }

    this.onDepartureChange = departure => this.setState({ departure })
    this.onArrivalChange = arrival => this.setState({ arrival })
    this.onDepartureSelected = (address, placeId) => {
      this.setState(prevState => ({
        bothDestinationsSelected: prevState.bothDestinationsSelected + 1,
        departure: address
      }))
    }
    this.onArrivalSelected = (address, placeId) => {
      this.setState(prevState => ({
        bothDestinationsSelected: prevState.bothDestinationsSelected + 1,
        arrival: address
      }))
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  /*
  * Usually, logic & fetching are minimized in a presentational component. It is not here.
  * I decided to "box" geocode fetching logic in this component as it will only be used
  * by itself, moreover most of the fecthing abstraction is already done by the tierce library.
  */
  handleFormSubmit() {
    const { departure, arrival } = this.state
    const { handleBikeSearch } = this.props

    /* We wait for both promise to resolve */
    Promise.all([geocodeByAddress(departure), geocodeByAddress(arrival)])
      .then(results => Promise.all([getLatLng(results[0][0]), getLatLng(results[1][0])]))
      .then(results =>
        handleBikeSearch({
          departureLatLng: results[0],
          arrivalLatLng: results[1]
        })
      )
      .catch(error => console.error('Error', error))
  }

  render() {
    const { departure, arrival, bothDestinationsSelected } = this.state

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
