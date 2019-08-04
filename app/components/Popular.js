import React from 'react'

export default class Popular extends React.Component {
  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      //*
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
              { className: 'btn-clear nav-link' },
              language
            )
          )
        ))
      )
      /**/

      /* 
      // use JSX
      <ul>
        {
          languages.map((language, index) => (
            <li key={ index }>
              <button className='btn-clear nav-link'>
                { language }
              </button>
            </li>
          ))
        }
      </ul>
      /* */
    )
  }
}