import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa'
import PropTypes from 'prop-types'

function Instructions() {
  return (
    <div>
      <h1>Instructions</h1>
      {/* why use an ordered list here? */}
      <ol>
        <li>
          <h4>Enter two Github users</h4>
          <FaUserFriends />
        </li>
        <li>
          <h4>Battle</h4>
          <FaFighterJet />
        </li>
        <li>
          <h4>See the winner</h4>
          <FaTrophy />
        </li>
      </ol>
    </div>
  )
}

export default class Battle extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Instructions />
      </React.Fragment>
    )
  }
}