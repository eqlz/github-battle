/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Popular from './components/Popular';
import Battle from './components/battle/Battle';

const App = () => (
  <div className="container">
    {/* <Popular /> */}
    <Battle />
  </div>
);

// take two arguments
// - the react element to be rendered
// - where the element to be rendered to
ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
