import React from 'react';
import PropTypes from 'prop-types';

function LoadingSpinner({ fullPage, size = 'medium', color }) {
  // Determine spinner size
  let spinnerSize;
  let borderWidth;
  
  switch (size) {
    case 'small':
      spinnerSize = '24px';
      borderWidth = '3px';
      break;
    case 'large':
      spinnerSize = '64px';
      borderWidth = '6px';
      break;
    case 'medium':
    default:
      spinnerSize = '42px';
      borderWidth = '4px';
      break;
  }

  // Determine spinner color
  const spinnerColor = color || 'var(--primary)';

  // Styles for the spinner
  const spinnerStyle = {
    border: `${borderWidth} solid rgba(255, 255, 255, 0.1)`,
    borderTop: `${borderWidth} solid ${spinnerColor}`,
    borderRadius: '50%',
    width: spinnerSize,
    height: spinnerSize,
    animation: 'spin 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
  };

  // Styles for the container
  const containerStyle = fullPage
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      };
      
  const textStyle = {
    marginTop: '16px',
    color: fullPage ? 'white' : 'var(--on-background)',
    fontWeight: 500,
    fontSize: fullPage ? '18px' : '16px',
    opacity: 0.9,
    animation: 'pulse 1.5s ease-in-out infinite'
  };

  // Add the keyframes for the spinning and pulsing animation
  const keyframesStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
  `;

  return (
    <div style={containerStyle} className={fullPage ? 'fullpage-spinner' : ''}>
      <style>{keyframesStyle}</style>
      <div style={spinnerStyle}></div>
      <div style={textStyle}>Loading...</div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  fullPage: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  fullPage: false,
  size: 'medium',
};

export default LoadingSpinner;