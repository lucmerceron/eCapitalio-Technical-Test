import {
  SEARCH_CLOSEST_STATIONS_SUCCESS,
  SEARCH_CLOSEST_STATIONS_FAILED
} from '../actionCreators/velibStation'

const initState = {
  departureStation: {},
  arrivalStation: {}
}
export default function velibStation(state = initState, action) {
  switch (action.type) {
    case SEARCH_CLOSEST_STATIONS_SUCCESS: {
      return {
        ...state,
        departureStation: action.departureStation,
        arrivalStation: action.arrivalStation
      }
    }
    case SEARCH_CLOSEST_STATIONS_FAILED: {
      return initState
    }
  }

  return state
}
