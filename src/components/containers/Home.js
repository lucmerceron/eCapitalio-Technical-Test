import { connect } from 'react-redux'

import { searchClosestStations } from '../../actionCreators/velibStation'
import { searchDirections } from '../../actionCreators/directions'
import Home from '../presentationals/Home'

const mapStateToProps = state => ({
  departureStation: state.velibStation.departureStation,
  arrivalStation: state.velibStation.arrivalStation,
  directions: state.directions
})

const mapDispatchToProps = dispatch => ({
  searchClosestStationsAndDirections: (departureLatLng, arrivalLatLng) => {
    dispatch(searchClosestStations(departureLatLng, arrivalLatLng)).then(
      ({ closestDepartureStation, closestArrivalStation }) => {
        dispatch(
          searchDirections(
            departureLatLng,
            arrivalLatLng,
            closestDepartureStation,
            closestArrivalStation
          )
        )
      }
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
