import {
  SEARCH_CLOSEST_DEPARTURE_BIKE_SUCCESS,
  SEARCH_CLOSEST_ARRIVAL_DOCK_SUCCESS,
  SEARCH_CLOSEST_DEPARTURE_BIKE_FAILED,
  SEARCH_CLOSEST_ARRIVAL_DOCK_FAILED
} from '../actionCreators/velibStation'

const initState = {
  departureStation: {},
  arrivalStation: {}
}
export default function velibStation(state = initState, action) {
  switch (action.type) {
    case SEARCH_CLOSEST_ARRIVAL_DOCK_SUCCESS: {
      return { ...state, arrivalStation: action.arrivalStation }
    }
    case SEARCH_CLOSEST_DEPARTURE_BIKE_SUCCESS: {
      return { ...state, departureStation: action.departureStation }
    }
  }

  return state
}
