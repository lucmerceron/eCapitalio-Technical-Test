import React from 'react'
import PropTypes from 'prop-types'
import { DirectionsRenderer } from 'react-google-maps'
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox'
import * as R from 'ramda'

import './InformativeDirection.css'

/* Useful to center the InfoBox */
const getCenterOfLocations = locations => {
  if (!locations) return null

  const bound = new window.google.maps.LatLngBounds()
  for (let i = 0; i < locations.length; i++) {
    bound.extend(locations[i])
  }
  return bound.getCenter()
}

const InformativeDirection = ({ directions, color }) => {
  if (!directions) return null

  /* Lens to access deeply nested attributes */
  const locationsLens = R.lensPath(['routes', 0, 'overview_path'])
  const distanceLens = R.lensPath(['routes', 0, 'legs', 0, 'distance', 'text'])
  const durationLens = R.lensPath(['routes', 0, 'legs', 0, 'duration', 'text'])

  const locations = R.view(locationsLens, directions)

  const componentsToRender = [
    <DirectionsRenderer
      key={0}
      options={{
        polylineOptions: {
          strokeColor: color
        }
      }}
      directions={directions}
    />
  ]

  if (locations)
    componentsToRender.push(
      <InfoBox
        key={1}
        defaultPosition={getCenterOfLocations(locations)}
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div className="informative-direction-info">
          <div className="informative-direction-distance">{R.view(distanceLens, directions)}</div>
          <div className="informative-direction-duration">{R.view(durationLens, directions)}</div>
        </div>
      </InfoBox>
    )

  return componentsToRender
}

InformativeDirection.propTypes = {
  directions: PropTypes.object,
  color: PropTypes.string.isRequired
}

export default InformativeDirection
