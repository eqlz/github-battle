import React from 'react'
import PropTypes from 'prop-types'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'

import { getBattleResults } from '../utils/api'
import Card from './Card'

function ProfileList({ profile }) {
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 115, 115)' size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <FaCompass color='rgb(144, 115, 255)' size={22} />
          {profile.location}
        </li>
      )}
      {profile.company && (
        <li>
          <FaBriefcase color='#795548' size={22} />
          {profile.company}
        </li>
      )}
      <li>
        <FaUsers color='rgb(129, 195, 245)' size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color='rgb(64, 183, 95)' size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
}
export default class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    }
  }
  componentDidMount() {
    const { playerOneUserName, playerTwoUserName } = this.props;
    getBattleResults([playerOneUserName, playerTwoUserName])
      .then((battleResults) => {
        this.setState({
          winner: battleResults[0],
          loser: battleResults[1],
          error: null,
          loading: false,
        })
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        })
      })
  }
  render() {
    const { winner, loser, error, loading } = this.state

    if(loading === true) {
      return <p>Loading...</p>
    }

    if(error) {
      return <p className='center-text error'>{error}</p>
    }

    return (
      <React.Fragment>
        <div className='grid space-around container-sm'>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            name={winner.profile.login}
            avatarUrl={winner.profile.avatar_url}
            profileUrl={winner.profile.html_url}
          >
            <ProfileList profile={winner.profile}/>
          </Card>
          
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            name={loser.profile.login}
            avatarUrl={loser.profile.avatar_url}
            profileUrl={loser.profile.html_url}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <button
          className='btn dark-btn btn-space'
          onClick={this.props.onReset}
        >
          Reset
        </button>
      </React.Fragment>
    )
  }
}