/* eslint-disable max-classes-per-file */
import React from 'react';
import {
  FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle,
} from 'react-icons/fa';
import PropTypes from 'prop-types';

import Results from './Results';
import ThemeContext from '../../contexts/theme';

function Instructions() {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className="instructions-container">
          <h1 className="header-lg center-text">Instructions</h1>
          <ol className="container-sm grid center-text battle-instructions">
            <li>
              <h4 className="header-sm">Enter two Github users</h4>
              <FaUserFriends className={`bg-${theme}`} color="rgb(255, 191, 116)" size={150} />
            </li>
            <li>
              <h4 className="header-sm">Battle</h4>
              <FaFighterJet className={`bg-${theme}`} color="#727272" size={150} />
            </li>
            <li>
              <h4 className="header-sm">See the winner</h4>
              <FaTrophy className={`bg-${theme}`} color="rgb(255, 215, 0)" size={150} />
            </li>
          </ol>
        </div>
      )}
    </ThemeContext.Consumer>

  );
}


const playerInputPropTypes = {
  onSubmitPlayer: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
    };

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onHandleSubmit(event) {
    event.preventDefault();

    // eslint-disable-next-line react/destructuring-assignment
    this.props.onSubmitPlayer(this.state.userName);
  }

  onHandleChange(event) {
    this.setState({
      userName: event.target.value,
    });
  }

  render() {
    const { label } = this.props;
    const { userName } = this.state;

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <form className="column player" onSubmit={this.onHandleSubmit}>
            <label className="player-label" htmlFor="username">
              {label}
            </label>
            <div className="row player-inputs">
              <input
                className={`input-${theme}`}
                type="text"
                id="username"
                placeholder="github username"
                autoComplete="off"
                value={userName}
                onChange={this.onHandleChange}
              />
              <button
                className={`btn ${theme === 'light' ? 'dark-btn' : 'light-btn'}`}
                type="submit"
                disabled={!userName}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeContext.Consumer>

    );
  }
}

PlayerInput.propTypes = playerInputPropTypes;

const palyerPreviewPropTypes = {
  userName: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

function PlayerPreview({ userName, onReset, label }) {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className="column player">
          <h4 className="player-label">{label}</h4>
          <div className={`row bg-${theme}`}>
            <div className="player-info">
              <img
                className="avatar-small"
                src={`https://github.com/${userName}.png?size=200`}
                alt={`Avatar for ${userName}`}
              />
              <a
                className="link"
                href={`https://github.com/${userName}`}
              >
                {userName}
              </a>
            </div>
            <button
              className="btn-clear flex-center"
              type="button"
              onClick={onReset}
            >
              <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
            </button>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

PlayerPreview.propTypes = palyerPreviewPropTypes;

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneUserName: '',
      playerTwoUserName: '',
      showBattleResult: false,
    };

    this.handleSubmittedPlayer = this.handleSubmittedPlayer.bind(this);
    this.handleResetPlayer = this.handleResetPlayer.bind(this);
  }

  handleSubmittedPlayer(id, playerUserName) {
    this.setState({
      [id]: playerUserName,
    });
  }

  handleResetPlayer(id) {
    this.setState({
      [id]: null,
    });
  }

  render() {
    const { playerOneUserName, playerTwoUserName, showBattleResult } = this.state;

    if (showBattleResult === true) {
      return (
        <Results
          playerOneUserName={playerOneUserName}
          playerTwoUserName={playerTwoUserName}
          onReset={() => this.setState({
            playerOneUserName: '',
            playerTwoUserName: '',
            showBattleResult: false,
          })}
        />
      );
    }
    return (
      <>
        <Instructions />

        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
            {playerOneUserName === ''
              ? (
                <PlayerInput
                  label="Player One"
                  onSubmitPlayer={(playerUserName) => this.handleSubmittedPlayer('playerOneUserName', playerUserName)}
                />
              )
              : (
                <PlayerPreview
                  userName={playerOneUserName}
                  onReset={() => this.handleResetPlayer('playerOne')}
                  label="Player One"
                />
              )}
            {playerTwoUserName === ''
              ? (
                <PlayerInput
                  label="Player Two"
                  onSubmitPlayer={(playerUserName) => this.handleSubmittedPlayer('playerTwoUserName', playerUserName)}
                />
              )
              : (
                <PlayerPreview
                  userName={playerTwoUserName}
                  onReset={() => this.handleResetPlayer('playerTwo')}
                  label="Player Two"
                />
              )}
          </div>
          {
            playerOneUserName
            && playerTwoUserName
            && (
              <button
                type="button"
                className="btn dark-btn btn-space"
                onClick={() => this.setState({ showBattleResult: true })}
              >
                Battle
              </button>
            )
          }
        </div>
      </>
    );
  }
}

export default Battle;
