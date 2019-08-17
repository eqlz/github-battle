import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa'
import PropTypes from 'prop-types'

function Instructions() {
  return (
    <div className='instructions-container'>
      <h1 className='header-lg center-text'>Instructions</h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h4 className='header-sm'>Enter two Github users</h4>
          <FaUserFriends className='bg-light' color='rgb(255, 191, 116)' size={150} />
        </li>
        <li>
          <h4 className='header-sm'>Battle</h4>
          <FaFighterJet className='bg-light' color='#727272' size={150} />
        </li>
        <li>
          <h4 className='header-sm'>See the winner</h4>
          <FaTrophy className='bg-light' color='rgb(255, 215, 0)' size={150} />
        </li>
      </ol>
    </div>
  )
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      useName: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state.userName);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input 
          type='text'
          value={this.state.userName}
        />
        <button
          type='submit'
        >
          submit
        </button>
      </form>
    )
  }
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