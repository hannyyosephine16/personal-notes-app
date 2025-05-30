import React from 'react';
import PropTypes from 'prop-types';

function NotFoundPage({ onBackToHome }) {
  const handleBackClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    console.log('NotFoundPage: Back to home button clicked');
    onBackToHome();
  };
  
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <p>Halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <button 
        onClick={handleBackClick}
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
        Kembali ke Beranda
      </button>
    </div>
  );
}

NotFoundPage.propTypes = {
  onBackToHome: PropTypes.func.isRequired
};

export default NotFoundPage;