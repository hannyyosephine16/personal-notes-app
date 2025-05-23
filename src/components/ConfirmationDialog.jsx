import React from 'react';
import PropTypes from 'prop-types';

function ConfirmationDialog({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog">
        <div className="confirmation-dialog__content">
          <p>{message}</p>
        </div>
        <div className="confirmation-dialog__actions">
          <button 
            className="confirmation-dialog__button confirmation-dialog__button--cancel" 
            onClick={onCancel}
          >
            Batal
          </button>
          <button 
            className="confirmation-dialog__button confirmation-dialog__button--confirm"
            onClick={onConfirm}
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