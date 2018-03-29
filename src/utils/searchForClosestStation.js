import * as R from 'ramda'
import distanceToLocation from './distanceToLocation'

/*
* This function is used to find the closest station to a position from an array of stations.
* Highly specific to the velib API result.
* lookingFor -- 'nbEbike' | 'nbFreeEDock'
*/
export default function searchForClosestStation(stations, position, lookingFor) {
  const latitudeLens = R.lensPath(['station', 'gps', 'latitude'])
  const longitudeLens = R.lensPath(['station', 'gps', 'longitude'])

  const closestStation = stations.reduce((closestAcc, currentStation) => {
    const latitude = R.view(latitudeLens, currentStation)
    const longitude = R.view(longitudeLens, currentStation)

    /* In case of incorrect station */
    if (currentStation[lookingFor] === 0 || !latitude || !longitude) return closestAcc

    const currentStationDistance = distanceToLocation(
      position.lat,
      position.lng,
      latitude,
      longitude
    )

    /* First correct station or distance inferior to the registered one */
    if (!closestAcc || currentStationDistance < closestAcc.distance) {
      return {
        name: currentStation.station.name,
        lat: latitude,
        lng: longitude,
        [lookingFor]: currentStation[lookingFor],
        distance: currentStationDistance
      }
    }

    return closestAcc
  }, null)

  return closestStation
}
