import React from 'react'

export default class Popular extends React.Component {
  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      // use React.createElement()
      React.createElement('ul', null, languages.map((language, index) => (
        React.createElement('li', { key: index }, language)
      )))

      /* 
      // use JSX
      <ul>
        {
          languages.map((language, index) => (
            <li key={ index }>
              { language }
            </li>
          ))
        }
      </ul>
      /* */
    )
  }
}