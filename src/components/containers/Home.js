import { connect } from 'react-redux'

import { searchClosestStations } from '../../actionCreators/velibStation'
import Home from '../presentationals/Home'

const mapStateToProps = state => ({
  departureStation: state.velibStation.departureStation,
  arrivalStation: state.velibStation.arrivalStation
})

const mapDispatchToProps = { searchClosestStations }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
