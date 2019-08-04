import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import Popular from './components/Popular'

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Popular />
      </div>
    )
  }
}

// take two arguments
// - the react element to be rendered
// - where the element to be rendered to
ReactDOM.render(
  <App />,
  document.getElementById('app')
)