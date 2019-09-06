/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import {
  FaUser, FaStar, FaCodeBranch, FaExclamationTriangle,
} from 'react-icons/fa';

import { fetchPopularRepos } from '../../utils/api';
import Card from '../shared/Card';
import Loading from '../shared/Loading';
import Tooltip from '../shared/Tooltip';

const languageNavPropTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

function LanguageNav({ selectedLanguage, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="flex-center">
      {
        languages.map((language) => (
          <li key={language}>
            <button
              type="button"
              className="btn-clear nav-link"
              style={language === selectedLanguage ? { color: 'red' } : null}
              onClick={() => onUpdateLanguage(language)}
            >
              {language}
            </button>
          </li>
        ))
      }
    </ul>
  );
}

LanguageNav.propTypes = languageNavPropTypes;

const reposGridPropTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  repos: PropTypes.array.isRequired,
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          owner, html_url, stargazers_count, forks_count, open_issues_count,
        } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`# ${index + 1}`}
              avatarUrl={avatar_url}
              profileUrl={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text="Github user's name">
                    <FaUser color="rgb(255, 191, 116)" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()}
                  {' '}
                  stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks_count.toLocaleString()}
                  {' '}
                  forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues_count.toLocaleString()}
                  {' '}
                  open issues
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = reposGridPropTypes;

class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
    });

    // eslint-disable-next-line react/destructuring-assignment
    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data,
            },
          }));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn('Error fetching repos', error);

          this.setState({
            error: 'There is an error fetching repos',
          });
        });
    }
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  }

  render() {
    console.log('this.props.match: ', this.props.match);
    const { selectedLanguage, repos, error } = this.state;
    return (
      <>
        <LanguageNav
          selectedLanguage={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <Loading text="Get Repos" speed={400} />}

        {error && <p>error</p>}

        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </>
    );
  }
}

export default Popular;
