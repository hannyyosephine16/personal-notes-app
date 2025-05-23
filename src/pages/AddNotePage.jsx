import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addNote } from '../utils/local-data';
import { useNotification } from '../contexts/NotificationContext';

function AddNotePage({ onBackToHome }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleError, setTitleError] = useState('');
  const { showSuccess } = useNotification();
  
  const onTitleChangeHandler = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    
    // Reset error when user types
    if (newTitle.trim()) {
      setTitleError('');
    }
  };
  
  const onBodyInputHandler = (event) => {
    setBody(event.target.innerHTML);
  };
  
  const validateForm = () => {
    let isValid = true;
    
    // Validate title is not empty
    if (!title.trim()) {
      setTitleError('Judul catatan tidak boleh kosong!');
      isValid = false;
    } else {
      setTitleError('');
    }
    
    return isValid;
  };
  
  const onSubmitHandler = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }
    
    console.log('AddNotePage: Adding note with title:', title);
    
    // Add the note
    const newNote = addNote({
      title,
      body
    });
    
    // Show success notification
    showSuccess(`Catatan "${newNote.title}" berhasil ditambahkan!`);
    
    // Navigate back to home
    onBackToHome();
  };
  
  return (
    <div className="add-new-page">
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          placeholder="Judul catatan"
          value={title}
          onChange={onTitleChangeHandler}
          style={{ borderBottom: titleError ? '2px solid #CF6679' : 'none' }}
        />
        {titleError && (
          <p style={{ color: '#CF6679', margin: '4px 0', fontSize: '14px' }}>
            {titleError}
          </p>
        )}
        <div
          className="add-new-page__input__body"
          data-placeholder="Tulis catatan Anda di sini..."
          contentEditable
          onInput={onBodyInputHandler}
        />
      </div>
      <div className="add-new-page__action">
        <button 
          className="action" 
          onClick={onSubmitHandler}
          title="Simpan Catatan"
          style={{ 
            position: 'relative', 
            zIndex: 100 
          }}
        >
          ✓
        </button>
      </div>
    </div>
  );
}

AddNotePage.propTypes = {
  onBackToHome: PropTypes.func.isRequired
};

export default AddNotePage;