import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
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
      userName: ''
    }

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onHandleSubmit(event) {
    event.preventDefault();

    this.props.onSubmitPlayer(this.state.userName);
  }

  onHandleChange(event) {
    this.setState({
      userName: event.target.value
    })
  }

  render() {
    return (
      <form className='column player' onSubmit={this.onHandleSubmit}>
        <label className='player-label' htmlFor='username'>
          {this.props.label}
        </label>
        <div className='row player-inputs'>
          <input
            className='input-light'
            type='text'
            id='username'
            placeholder='github username'
            autoComplete='off'
            value={this.state.userName}
            onChange={this.onHandleChange}
          />
          <button
            className='btn dark-btn'
            type='submit'
            disabled={!this.state.userName}
          >
            Submit
          </button>
        </div>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  onSubmitPlayer: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

function PlayerPreview({ userName, onReset, label }) {
  return (
    <div className='column player'>
      <h4 className='player-label'>{label}</h4>
      <div className='row bg-light'>
        <div className='player-info'>
          <img
            className='avatar-small'
            src={`https://github.com/${userName}.png?size=200`}
            alt={`Avatar for ${userName}`}
          />
          <a
            className='link'
            href={`https://github.com/${userName}`}
          >
            {userName}
          </a>
        </div>
        <button
          className='btn-clear flex-center'
          onClick={onReset}
        >
          <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
        </button>
      </div>
    </div>
  )
}

PlayerPreview.propTypes = {
  userName: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default class Battle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playerOneUserName: null,
      playerTwoUserName: null,
    }

    this.handleSubmittedPlayer = this.handleSubmittedPlayer.bind(this);
    this.handleResetPlayer = this.handleResetPlayer.bind(this);
  }

  handleSubmittedPlayer(id, playerUserName) {
    this.setState({
      [id]: playerUserName
    })
  }

  handleResetPlayer(id) {
    this.setState({
      [id]: null
    })
  }

  render() {
    const { playerOneUserName, playerTwoUserName } = this.state;

    return (
      <React.Fragment>
        <Instructions />

        <div>
          <h1 className='center-text header-lg'>Players</h1>
          <div className='row space-around'>
            {playerOneUserName === null
              ? <PlayerInput
                  label='Player One'
                  onSubmitPlayer={(playerUserName) => this.handleSubmittedPlayer('playerOneUserName', playerUserName)}
                />
              : <PlayerPreview
                  userName={playerOneUserName}
                  onReset={() => this.handleResetPlayer('playerOne')}
                  label='Player One'
                /> 
            }
            {playerTwoUserName === null
              ? <PlayerInput
                  label='Player Two'
                  onSubmitPlayer={(playerUserName) => this.handleSubmittedPlayer('playerTwoUserName', playerUserName)}
                />
              : <PlayerPreview 
                  userName={playerTwoUserName}
                  onReset={() => this.handleResetPlayer('playerTwo')}
                  label='Player Two'
                /> 
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}