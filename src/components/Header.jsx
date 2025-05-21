import React from 'react';
import PropTypes from 'prop-types';

function Header({ searchQuery, setSearchQuery, activePage, setActivePage }) {
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
  
  return (
    <header>
      <h1>Notes App</h1>
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
              Home
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
              Archives
            </button>
          </li>
        </ul>
      </div>
      <div className="search-bar">
        <input 
          type="text"
          placeholder="Search notes by title..."
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