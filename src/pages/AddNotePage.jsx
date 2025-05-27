import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { addNote } from '../utils/network-data';
import { LocaleContext } from '../contexts/LocaleContext';
import { AuthContext } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';

function AddNotePage({ onBackToHome }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleError, setTitleError] = useState('');
  
  const { texts } = useContext(LocaleContext);
  const { isLoading, setIsLoading } = useContext(AuthContext);
  const { showSuccess, showError } = useNotification();
  
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
      setTitleError(texts.titleRequired);
      isValid = false;
    } else {
      setTitleError('');
    }
    
    return isValid;
  };
  
  const onSubmitHandler = async (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }
    
    console.log('AddNotePage: Adding note with title:', title);
    
    setIsLoading(true);
    try {
      // Add the note
      const { error, data, message } = await addNote({ title, body });
      
      if (error) {
        showError(message || 'Failed to create note');
      } else {
        // Show success notification
        showSuccess(`${texts.noteCreated}`);
        // Navigate back to home
        onBackToHome();
      }
    } catch (error) {
      console.error('Error creating note:', error);
      showError('An error occurred while creating the note');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="add-new-page">
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          placeholder={texts.titlePlaceholder}
          value={title}
          onChange={onTitleChangeHandler}
          style={{ borderBottom: titleError ? '2px solid var(--error)' : 'none' }}
        />
        {titleError && (
          <p style={{ color: 'var(--error)', margin: '4px 0', fontSize: '14px' }}>
            {titleError}
          </p>
        )}
        <div
          className="add-new-page__input__body"
          data-placeholder={texts.bodyPlaceholder}
          contentEditable
          onInput={onBodyInputHandler}
        />
      </div>
      <div className="add-new-page__action">
        <button 
          className="action" 
          onClick={onSubmitHandler}
          title={texts.save}
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