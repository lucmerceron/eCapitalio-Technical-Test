import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

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
  }

  handleFormSubmit = event => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render() {
    const { departure, arrival, bothDestinationsSelected } = this.state
    console.log(this.state)
    return (
      <form onSubmit={this.handleFormSubmit} className="bike-my-way-form">
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
        <button type="submit" disabled={bothDestinationsSelected < 2}>
          Find my Bike !
        </button>
      </form>
    )
  }
}

export default AutocompleteInput
