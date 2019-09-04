import React from 'react';
import { ThemeConsumer } from '../../contexts/Theme';

function Nav() {
  return (
    <ThemeConsumer>
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
    </ThemeConsumer>
  );
}

export default Nav;
