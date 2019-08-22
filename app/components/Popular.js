import React from 'react'
import PropTypes from 'prop-types'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'

import { fetchPopularRepos } from '../utils/api'
import Card from './Card'
import Loading from './Loading'

function LanguageNav({ selectedLanguage, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      /*
      // use React.createElement()
      React.createElement(
        'ul',
        { className: 'flex-center' }, 
        languages.map((language, index) => (
          React.createElement(
            'li',
            { key: index },
            React.createElement(
              'button',
              {
                className: 'btn-clear nav-link',
                onClick: () => this.updateLanguage(language),
                style: language === this.state.selectedLanguage ? { color: 'red' } : null
              },
              language
            )
          )
        ))
      )
      /**/

      //* 
      // use JSX
      <ul className='flex-center'>
        {
          languages.map((language, index) => {
            return (
            <li key={index}>
              <button 
                className='btn-clear nav-link' 
                style={language === selectedLanguage ? { color: 'red' } : null} 
                onClick={() => onUpdateLanguage(language)}
              >
                {language}
              </button>
            </li>
            );
          })
        }
      </ul>
      /* */
    )
}

// Not sure how this is better than just using TypeScript
// Need to look into how to use TypeScript in React
LanguageNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

// function ReposGrid (props) {
  // const { repos } = props;
function ReposGrid ({ repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks_count, open_issues_count } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`# ${index + 1}`}
              avatarUrl={avatar_url}
              profileUrl={html_url}
              name={login}
            >
              <ul className='card-list'>
                <li>
                  <FaUser color='rgb(255, 191, 116)' size={22} />
                  <a href={`https://github.com/${login}`}>{login}</a>
                </li>
                <li>
                  <FaStar color='rgb(255, 215, 0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                  {forks_count.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                  {open_issues_count.toLocaleString()} open issues
                </li>
              </ul>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}
ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}
export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null,
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
    });

    if(!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
      .then((data) => {
        this.setState(({ repos }) => ({
          repos: {
            ...repos,
            [selectedLanguage]: data
          }
        }));
      })
      .catch((error) => {
        console.warn('Error fetching repos', error);

        this.setState({
          error: 'There is an error fetching repos'
        })
      });
    }
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <React.Fragment>
        <LanguageNav
          selectedLanguage={ selectedLanguage }
          onUpdateLanguage={ this.updateLanguage }
        />

        {this.isLoading() && <Loading text={'Get Repos'} speed={400}/>}

        {error && <p>error</p>}

        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </React.Fragment>
    )
  }
}