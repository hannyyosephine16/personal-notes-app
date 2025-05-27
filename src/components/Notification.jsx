import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Notification({ message, type, onClose, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        setTimeout(onClose, 500); // Allow time for animation before removing
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Determine background color based on message content or type
  const getBackgroundColor = () => {
    // Cek pesan untuk kata kunci spesifik
    if (message.includes('deleted') || message.includes('dihapus')) {
      return '#CF6679'; // Merah untuk pesan penghapusan
    } else if (message.includes('archived') || message.includes('diarsipkan')) {
      return '#F39C12'; // Kuning untuk pesan pengarsipan
    } else if (message.includes('created') || message.includes('ditambahkan') || message.includes('berhasil')) {
      return '#4CAF50'; // Hijau untuk pesan penambahan/berhasil
    } else {
      // Jika tidak cocok dengan kata kunci, gunakan tipe yang diberikan
      switch (type) {
        case 'success':
          return '#4CAF50'; // Hijau
        case 'error':
          return '#CF6679'; // Merah
        case 'warning':
          return '#F39C12'; // Kuning
        default:
          return '#BB86FC'; // Ungu (default)
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        backgroundColor: getBackgroundColor(),
        color: '#FFFFFF',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'opacity 0.5s, transform 0.5s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: '300px',
        maxWidth: '400px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        fontWeight: 'bold'
      }}
    >
      <div
        style={{
          flexGrow: 1,
          fontSize: '14px',
          color: '#FFFFFF',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
          fontWeight: 'bold'
        }}
      >
        {message}
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          if (onClose) {
            setTimeout(onClose, 300);
          }
        }}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#FFFFFF',
          cursor: 'pointer',
          fontSize: '20px',
          marginLeft: '16px',
          padding: '0 8px',
          fontWeight: 'bold'
        }}
      >
        ×
      </button>
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  onClose: PropTypes.func,
  duration: PropTypes.number
};

Notification.defaultProps = {
  type: 'info',
  duration: 3000,
  onClose: () => {}
};

export default Notification;