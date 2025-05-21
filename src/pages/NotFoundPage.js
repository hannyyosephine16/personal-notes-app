import React from 'react';
import PropTypes from 'prop-types';

function NotFoundPage({ onBackToHome }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <button 
        onClick={onBackToHome}
        style={{ 
          display: 'inline-block', 
          marginTop: '20px',
          padding: '8px 16px',
          backgroundColor: 'var(--primary)',
          color: 'var(--on-background)',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

NotFoundPage.propTypes = {
  onBackToHome: PropTypes.func.isRequired
};

export default NotFoundPage;

