import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LocaleContext } from '../contexts/LocaleContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { texts } = useContext(LocaleContext);

  return (
    <button
      onClick={toggleTheme}
      title={texts.changeTheme}
      className="theme-toggle"
      aria-label={texts.changeTheme}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;