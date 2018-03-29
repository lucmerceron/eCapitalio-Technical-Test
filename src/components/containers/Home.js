import { connect } from 'react-redux'

import {
  searchClosestDepartureBike,
  searchClosestArrivalDock
} from '../../actionCreators/velibStation'
import Home from '../presentationals/Home'

const mapStateToProps = state => ({
  velibStation: state.velibStation
})

const mapDispatchToProps = { searchClosestDepartureBike, searchClosestArrivalDock }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
