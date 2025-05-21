import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addNote } from '../utils/local-data';

function AddNotePage({ onBackToHome }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  
  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  
  const onBodyInputHandler = (event) => {
    setBody(event.target.innerHTML);
  };
  
  const onSubmitHandler = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('AddNotePage: Adding note with title:', title);
    addNote({
      title,
      body
    });
    
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
        />
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