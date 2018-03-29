import { SEARCH_DIRECTIONS_SUCCESS, SEARCH_DIRECTIONS_FAILED } from '../actionCreators/directions'

const initState = {
  departureToStationDirections: null,
  stationToStationDirections: null,
  stationToArrivalDirections: null
}
export default function directions(state = initState, action) {
  switch (action.type) {
    case SEARCH_DIRECTIONS_SUCCESS: {
      return {
        departureToStationDirections: action.departureToStationDirections,
        stationToStationDirections: action.stationToStationDirections
        stationToArrivalDirections: action.stationToArrivalDirections,
      }
    }
    case SEARCH_DIRECTIONS_FAILED: {
      return initState
    }
    default: {
      return state
    }
  }
}
