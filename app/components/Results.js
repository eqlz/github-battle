import React from 'react'
import { getBattleResults } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import Card from './Card'

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
      <div className='grid space-around container-sm'>
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          name={winner.profile.login}
          avatarUrl={winner.profile.avatar_url}
          profileUrl={winner.profile.html_url}
        >
          <ul className='card-list'>
            <li>
              <FaUser color='rgb(239, 115, 115)' size={22} />
              {winner.profile.name}
            </li>
            {winner.profile.location && (
              <li>
                <FaCompass color='rgb(144, 115, 255)' size={22} />
                {winner.profile.location}
              </li>
            )}
            {winner.profile.company && (
              <li>
                <FaBriefcase color='#795548' size={22} />
                {winner.profile.company}
              </li>
            )}
            <li>
              <FaUsers color='rgb(129, 195, 245)' size={22} />
              {winner.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color='rgb(64, 183, 95)' size={22} />
              {winner.profile.following.toLocaleString()} following
            </li>
          </ul>
        </Card>
        
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Loser'}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          name={loser.profile.login}
          avatarUrl={loser.profile.avatar_url}
          profileUrl={loser.profile.html_url}
        >
          <ul className='card-list'>
            <li>
              <FaUser color='rgb(239, 115, 115)' size={22} />
              {loser.profile.name}
            </li>
            {loser.profile.location && (
              <li>
                <FaCompass color='rgb(144, 115, 255)' size={22} />
                {loser.profile.location}
              </li>
            )}
            {loser.profile.company && (
              <li>
                <FaBriefcase color='#795548' size={22} />
                {loser.profile.company}
              </li>
            )}
            <li>
              <FaUsers color='rgb(129, 195, 245)' size={22} />
              {loser.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color='rgb(64, 183, 95)' size={22} />
              {loser.profile.following.toLocaleString()} following
            </li>
          </ul>
        </Card>
      </div>
    )
  }
}