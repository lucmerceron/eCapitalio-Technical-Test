import makeActionCreator from './makeActionCreator'
import Api from '../service/Api'
import constants from '../constants/constants'
import distanceToLocation from '../utils/distanceToLocation'

/* Action types */
export const SEARCH_CLOSEST_DEPARTURE_BIKE_REQUEST = 'SEARCH_CLOSEST_DEPARTURE_BIKE_REQUEST'
export const SEARCH_CLOSEST_DEPARTURE_BIKE_SUCCESS = 'SEARCH_CLOSEST_DEPARTURE_BIKE_SUCCESS'
export const SEARCH_CLOSEST_DEPARTURE_BIKE_FAILED = 'SEARCH_CLOSEST_DEPARTURE_BIKE_FAILED'
export const SEARCH_CLOSEST_ARRIVAL_DOCK_REQUEST = 'SEARCH_CLOSEST_ARRIVAL_DOCK_REQUEST'
export const SEARCH_CLOSEST_ARRIVAL_DOCK_SUCCESS = 'SEARCH_CLOSEST_ARRIVAL_DOCK_SUCCESS'
export const SEARCH_CLOSEST_ARRIVAL_DOCK_FAILED = 'SEARCH_CLOSEST_ARRIVAL_DOCK_FAILED'

/* Action creators */
export const searchClosestDepartureBikeRequest = makeActionCreator(
  SEARCH_CLOSEST_DEPARTURE_BIKE_REQUEST,
  'lat',
  'lng'
)
export const searchClosestDepartureBikeSuccess = makeActionCreator(
  SEARCH_CLOSEST_DEPARTURE_BIKE_SUCCESS,
  'bike'
)
export const searchClosestDepartureBikeFailed = makeActionCreator(
  SEARCH_CLOSEST_DEPARTURE_BIKE_FAILED,
  'error'
)
export const searchClosestArrivalDockRequest = makeActionCreator(
  SEARCH_CLOSEST_ARRIVAL_DOCK_REQUEST,
  'lat',
  'lng'
)
export const searchClosestArrivalDockSuccess = makeActionCreator(
  SEARCH_CLOSEST_ARRIVAL_DOCK_SUCCESS,
  'dock'
)
export const searchClosestArrivalDockFailed = makeActionCreator(
  SEARCH_CLOSEST_ARRIVAL_DOCK_FAILED,
  'error'
)

/* Thunk action creators */
// TODO: Dry these functions
export function searchClosestDepartureBike(lat, lng) {
  return dispatch => {
    dispatch(searchClosestDepartureBikeRequest(lat, lng))

    // [Important Optimization] TODO if time: Do this get once at the end of page loading
    Api.get(constants.velibApiUrl).then(results => {
      const trimedResults = results
        .filter(
          result =>
            result.nbBike !== 0 &&
            result.station &&
            result.stations.gps &&
            result.stations.gps.latitude &&
            result.stations.gps.longitude
        ) // Filter the status with no bike available
        .map(result => ({
          name: result.station.name,
          lat: result.station.gps.latitude,
          lng: result.station.gps.longitude,
          nbBike: result.nbBike,
          distance: distanceToLocation(
            lat,
            lng,
            result.station.gps.latitude,
            result.station.gps.longitude
          )
        }))

      console.log('DEPATURE', results, trimedResults)
    })
  }
}

export function searchClosestArrivalDock(lat, lng) {
  return dispatch => {
    dispatch(searchClosestArrivalDockRequest(lat, lng))

    Api.get(constants.velibApiUrl).then(results => {
      const trimedResults = results
        .filter(
          result =>
            result.nbFreeDock !== 0 &&
            result.station &&
            result.stations.gps &&
            result.stations.gps.latitude &&
            result.stations.gps.longitude
        ) // Filter the status with no bike available
        .map(result => ({
          name: result.station.name,
          lat: result.station.gps.latitude,
          lng: result.station.gps.longitude,
          nbFreeDock: result.nbFreeDock,
          distance: distanceToLocation(
            lat,
            lng,
            result.station.gps.latitude,
            result.station.gps.longitude
          )
        }))

      console.log('ARRIVAL', results, trimedResults)
    })
  }
}
