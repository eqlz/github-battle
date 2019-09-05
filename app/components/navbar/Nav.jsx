import React from 'react';
import ThemeContext from '../../contexts/theme';

function Nav() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
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
