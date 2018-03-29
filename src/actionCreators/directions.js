import makeActionCreator from './makeActionCreator'

/* Scoped to this module */
const DirectionsService = new window.google.maps.DirectionsService()
const WALKING = window.google.maps.TravelMode.WALKING
const BICYCLING = window.google.maps.TravelMode.BICYCLING

/* Action types */
export const SEARCH_DIRECTIONS_REQUEST = 'SEARCH_DIRECTIONS_REQUEST'
export const SEARCH_DIRECTIONS_SUCCESS = 'SEARCH_DIRECTIONS_SUCCESS'
export const SEARCH_DIRECTIONS_FAILED = 'SEARCH_DIRECTIONS_FAILED'

/* Action creators */
export const searchDirectionsRequest = makeActionCreator(
  SEARCH_DIRECTIONS_REQUEST,
  'departureLatLng',
  'arrivalLatLng',
  'departureStation',
  'arrivalStation'
)
export const searchDirectionsSuccess = makeActionCreator(
  SEARCH_DIRECTIONS_SUCCESS,
  'departureToStationDirections',
  'stationToStationDirections',
  'stationToArrivalDirections'
)
export const searchDirectionsFailed = makeActionCreator(SEARCH_DIRECTIONS_FAILED, 'error')

/* Thunk action creators */
export function searchDirections(departureLatLng, arrivalLatLng, departureStation, arrivalStation) {
  return dispatch => {
    dispatch(
      searchDirectionsRequest(departureLatLng, arrivalLatLng, departureStation, arrivalStation)
    )
    Promise.all([
      retrieveDirection(departureLatLng, getLatLngOfStation(departureStation), WALKING),
      retrieveDirection(
        getLatLngOfStation(departureLatLng),
        getLatLngOfStation(arrivalStation),
        BICYCLING
      ),
      retrieveDirection(getLatLngOfStation(arrivalStation), arrivalLatLng, WALKING)
    ])
      .then(directions => {
        dispatch(searchDirectionsSuccess(...directions))
      })
      .catch(err => dispatch(searchDirectionsFailed(err)))
  }
}

const getLatLngOfStation = station => ({ lat: station.lat, lng: station.lng })

const retrieveDirection = (origin, destination, travelMode) =>
  new Promise((resolve, reject) => {
    DirectionsService.route({ origin, destination, travelMode }, (directions, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        resolve(directions)
      } else {
        reject('Sorry, we were unable to calculate the directions, please try another route.')
      }
    })
  })
