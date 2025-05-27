import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from '../contexts/LocaleContext';
import { AuthContext } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import LocaleToggle from './LocaleToggle';

function Header({ searchQuery, setSearchQuery, activePage, setActivePage }) {
  const { texts } = useContext(LocaleContext);
  const { authUser, onLogout } = useContext(AuthContext);
  
  const onSearchChangeHandler = (event) => {
    const query = event.target.value;
    console.log('Search query changed to:', query);
    setSearchQuery(query);
  };
  
  const handleHomeClick = (event) => {
    event.preventDefault();
    console.log('Home button clicked');
    setActivePage('home');
  };
  
  const handleArchivesClick = (event) => {
    event.preventDefault();
    console.log('Archives button clicked');
    setActivePage('archives');
  };
  
  const handleLogout = (event) => {
    event.preventDefault();
    console.log('Logout button clicked');
    onLogout();
  };
  
  return (
    <header>
      <h1>{texts.appTitle}</h1>
      <div className="navigation">
        <ul>
          <li>
            <button 
              onClick={handleHomeClick}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '24px',
                color: 'var(--on-background)',
                textDecoration: activePage === 'home' ? 'underline' : 'none'
              }}
            >
              {texts.home}
            </button>
          </li>
          <li>
            <button 
              onClick={handleArchivesClick}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '24px',
                color: 'var(--on-background)',
                textDecoration: activePage === 'archives' ? 'underline' : 'none'
              }}
            >
              {texts.archives}
            </button>
          </li>
        </ul>
      </div>
      <div className="header-actions">
        <div className="toggle-buttons">
          <ThemeToggle />
          <LocaleToggle />
        </div>
        <div className="user-info">
          <span>{authUser.name}</span>
          <button 
            onClick={handleLogout}
            className="logout-button"
            title={texts.logout}
          >
            {texts.logout}
          </button>
        </div>
      </div>
      <div className="search-bar">
        <input 
          type="text"
          placeholder={texts.searchPlaceholder}
          value={searchQuery}
          onChange={onSearchChangeHandler}
        />
      </div>
    </header>
  );
}

Header.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};

export default Header;