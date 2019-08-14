import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

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
      fetchPopularRepos(this.state.selectedLanguage)
      .then((data) => {
        this.setState(() => ({
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
    return this.state.repos === null && this.state.error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <React.Fragment>
        <LanguageNav
          selectedLanguage={ selectedLanguage }
          onUpdateLanguage={ this.updateLanguage }
        />

        {this.isLoading() && <p>Loading</p>}

        {error && <p>error</p>}

        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </React.Fragment>
    )
  }
}