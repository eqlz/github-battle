import React from 'react';
import PropTypes from 'prop-types';
import {
  FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaUser,
} from 'react-icons/fa';

import { getBattleResults } from '../../utils/api';
import Card from '../shared/Card';
import Loading from '../shared/Loading';
import Tooltip from '../shared/Tooltip';

const profileListPropTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  profile: PropTypes.object.isRequired,
};

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's Location">
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's Company">
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()}
        {' '}
        followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()}
        {' '}
        following
      </li>
    </ul>
  );
}

ProfileList.propTypes = profileListPropTypes;

const resultsPropTypes = {
  playerOneUserName: PropTypes.string.isRequired,
  playerTwoUserName: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
};

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
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
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }

  render() {
    const {
      winner, loser, error, loading,
    } = this.state;

    const {
      onReset,
    } = this.props;

    if (loading === true) {
      return <Loading text="Battle In Progress" speed={200} />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return (
      <>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            name={winner.profile.login}
            avatarUrl={winner.profile.avatar_url}
            profileUrl={winner.profile.html_url}
          >
            <ProfileList profile={winner.profile} />
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
          type="button"
          className="btn dark-btn btn-space"
          onClick={onReset}
        >
          Reset
        </button>
      </>
    );
  }
}

Results.propTypes = resultsPropTypes;

export default Results;
