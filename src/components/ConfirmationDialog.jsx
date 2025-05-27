import React from 'react';
import PropTypes from 'prop-types';

function ConfirmationDialog({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog" style={{ backgroundColor: "#1E1E1E" }}>
        <div className="confirmation-dialog__content">
          <p style={{ color: "#FFFFFF" }}>{message}</p>
        </div>
        <div className="confirmation-dialog__actions">
          <button 
            className="confirmation-dialog__button confirmation-dialog__button--cancel" 
            onClick={onCancel}
            style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#FFFFFF"
            }}
          >
            Batal
          </button>
          <button 
            className="confirmation-dialog__button confirmation-dialog__button--confirm"
            onClick={onConfirm}
            style={{ 
              backgroundColor: "#CF6679",
              color: "#FFFFFF"
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ConfirmationDialog;