import makeActionCreator from './makeActionCreator'
import Api from '../service/Api'
import constants from '../constants/constants'
import searchForClosestStation from '../utils/searchForClosestStation'

/* Action types */
export const SEARCH_CLOSEST_STATIONS_REQUEST = 'SEARCH_CLOSEST_STATIONS_REQUEST'
export const SEARCH_CLOSEST_STATIONS_SUCCESS = 'SEARCH_CLOSEST_STATIONS_SUCCESS'
export const SEARCH_CLOSEST_STATIONS_FAILED = 'SEARCH_CLOSEST_STATIONS_FAILED'

/* Action creators */
export const searchClosestStationsRequest = makeActionCreator(
  SEARCH_CLOSEST_STATIONS_REQUEST,
  'departureLatLng',
  'arrivalLatLng'
)
export const searchClosestStationsSuccess = makeActionCreator(
  SEARCH_CLOSEST_STATIONS_SUCCESS,
  'departureStation',
  'arrivalStation'
)
export const searchClosestStationsFailed = makeActionCreator(
  SEARCH_CLOSEST_STATIONS_FAILED,
  'error'
)

/* Thunk action creators */
export function searchClosestStations(departureLatLng, arrivalLatLng) {
  return dispatch => {
    dispatch(searchClosestStationsRequest(departureLatLng, arrivalLatLng))

    // [Optimization] TODO if time: Do this GET once at the end of page loading and store the result in the store
    return Api.get(constants.velibApiUrl).then(stations => {
      const closestDepartureStation = searchForClosestStation(stations, departureLatLng, 'nbEbike')
      const closestArrivalStation = searchForClosestStation(stations, arrivalLatLng, 'nbFreeEDock')

      if (closestArrivalStation && closestDepartureStation)
        dispatch(searchClosestStationsSuccess(closestArrivalStation, closestDepartureStation))
      else
        dispatch(
          searchClosestStationsFailed(
            'Sorry, we were not able to find a way to you destination, please try another route.'
          )
        )

      return { closestDepartureStation, closestArrivalStation }
    })
  }
}
