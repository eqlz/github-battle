/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';

import Popular from './components/popular/Popular';
import Battle from './components/battle/Battle';
import ThemeContext from './contexts/theme';
import Nav from './components/navbar/Nav';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light',
        }));
      },
    };
  }

  render() {
    return (
      <Router>
        <ThemeContext.Provider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <Route exact path="/" component={Popular} />
              <Route path="/battle" component={Battle} />
              {/* <Battle /> */}
            </div>
          </div>
        </ThemeContext.Provider>
      </Router>
    );
  }
}

// take two arguments
// - the react element to be rendered
// - where the element to be rendered to
ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
