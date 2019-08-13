import React from 'react'

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
export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All'
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage
    });
  }

  render() {
    const { selectedLanguage } = this.state;
    return (
      <React.Fragment>
        <LanguageNav
          selectedLanguage={ selectedLanguage }
          onUpdateLanguage={ this.updateLanguage }
        />
      </React.Fragment>
    )
  }
}