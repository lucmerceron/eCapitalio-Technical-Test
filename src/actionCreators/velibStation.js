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
  'departureStation'
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
  'arrivalStation'
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
    return Api.get(constants.velibApiUrl).then(results => {
      const trimedResults = results
        .filter(
          result =>
            result.nbEbike !== 0 &&
            result.station &&
            result.station.gps &&
            result.station.gps.latitude &&
            result.station.gps.longitude
        ) // Filter the status with no bike available
        .map(result => ({
          name: result.station.name,
          lat: result.station.gps.latitude,
          lng: result.station.gps.longitude,
          nbEbike: result.nbEbike,
          distance: distanceToLocation(
            lat,
            lng,
            result.station.gps.latitude,
            result.station.gps.longitude
          )
        }))
      const closestStation = trimedResults.reduce(
        (closestStation, currentStation) =>
          currentStation.distance < closestStation.distance ? currentStation : closestStation,
        trimedResults[0]
      )

      if (closestStation) dispatch(searchClosestDepartureBikeSuccess(closestStation))
      else dispatch(searchClosestDepartureBikeFailed('Free bike not found around you'))
      return closestStation
    })
  }
}

export function searchClosestArrivalDock(lat, lng) {
  return dispatch => {
    dispatch(searchClosestArrivalDockRequest(lat, lng))

    return Api.get(constants.velibApiUrl).then(results => {
      const trimedResults = results
        .filter(
          result =>
            result.nbFreeEDock !== 0 &&
            result.station &&
            result.station.gps &&
            result.station.gps.latitude &&
            result.station.gps.longitude
        ) // Filter the status with no bike available
        .map(result => ({
          name: result.station.name,
          lat: result.station.gps.latitude,
          lng: result.station.gps.longitude,
          nbFreeEDock: result.nbFreeEDock,
          distance: distanceToLocation(
            lat,
            lng,
            result.station.gps.latitude,
            result.station.gps.longitude
          )
        }))

      const closestStation = trimedResults.reduce(
        (closestStation, currentStation) =>
          currentStation.distance < closestStation.distance ? currentStation : closestStation,
        trimedResults[0]
      )

      if (closestStation) dispatch(searchClosestArrivalDockSuccess(closestStation))
      else dispatch(searchClosestArrivalDockFailed('Free dock not found near your arrival'))
      return closestStation
    })
  }
}
