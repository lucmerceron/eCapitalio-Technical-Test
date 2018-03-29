import React from 'react'
import PropTypes from 'prop-types'

import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'

import './SpecialMarker.css'

const iconMatcher = {
  BICYCLE: `&#xE52F;`,
  WALK: `&#xE536;`,
  FINISH: `&#xE55F;`
}

const SpecialMarker = ({ icon, location }) => (
  <MarkerWithLabel
    icon=" "
    position={{ lat: location.lat, lng: location.lng }}
    labelAnchor={new window.google.maps.Point(24, 24)}
    labelClass="special-marker-label"
  >
    <i className="material-icons" dangerouslySetInnerHTML={{ __html: iconMatcher[icon] }} />
  </MarkerWithLabel>
)

SpecialMarker.propTypes = {
  icon: PropTypes.oneOf(Object.keys(iconMatcher)).isRequired,
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired
}

export default SpecialMarker
