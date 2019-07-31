import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class App extends React.Component {
  render() {
    return (
      <div>
        hello world!
      </div>
    )
  }
}

// take two arguments
// - the react element to be rendered
// - where the element to be rendered to
RenderDom.render(
  <App />,
  document.getElementById('app')
)