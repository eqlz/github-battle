import React from 'react';
import { NavLink } from 'react-router-dom';

import ThemeContext from '../../contexts/theme';

const activeStyle = {
  color: 'red',
};

function Nav() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
          <ul className="row nav">
            <li>
              <NavLink
                exact
                to="/"
                activeStyle={activeStyle}
                className="nav-link"
              >
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/battle"
                activeStyle={activeStyle}
                className="nav-link"
              >
                Battle
              </NavLink>
            </li>
          </ul>
          <button
            type="button"
            style={{ fontSize: 30 }}
            className="btn-clear"
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🔦 ' : '💡' }
          </button>
        </nav>
      )}
    </ThemeContext.Consumer>
  );
}

export default Nav;
