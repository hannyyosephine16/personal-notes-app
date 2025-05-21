import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';
import { showFormattedDate } from '../utils/index';

function NoteDetailPage({ noteId, onBackToHome }) {
  const [note, setNote] = useState(null);
  
  useEffect(() => {
    console.log('NoteDetailPage: Loading note with id:', noteId);
    const selectedNote = getNote(noteId);
    if (selectedNote) {
      console.log('Note found:', selectedNote);
      setNote(selectedNote);
    } else {
      console.log('Note not found, navigating back to home');
      onBackToHome();
    }
  }, [noteId, onBackToHome]);
  
  const onDeleteHandler = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('NoteDetailPage: Deleting note with id:', note.id);
    deleteNote(note.id);
    onBackToHome();
  };
  
  const onArchiveHandler = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('NoteDetailPage: Toggling archive status for note with id:', note.id);
    if (note.archived) {
      unarchiveNote(note.id);
      setNote({ ...note, archived: false });
    } else {
      archiveNote(note.id);
      setNote({ ...note, archived: true });
    }
  };
  
  if (!note) {
    return <p>Loading...</p>;
  }
  
  return (
    <div className="detail-page">
      <h2 className="detail-page__title">{note.title}</h2>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body" dangerouslySetInnerHTML={{ __html: note.body }}></div>
      <div className="detail-page__action">
        <button 
          className="action" 
          onClick={onDeleteHandler}
          style={{ 
            backgroundColor: '#CF6679',
            position: 'relative',
            zIndex: 100
          }}
          title="Delete"
        >
          🗑️
        </button>
        <button 
          className="action" 
          onClick={onArchiveHandler}
          style={{ 
            backgroundColor: note.archived ? '#03DAC6' : '#F39C12',
            position: 'relative',
            zIndex: 100
          }}
          title={note.archived ? "Unarchive" : "Archive"}
        >
          {note.archived ? '⟲' : '📁'}
        </button>
      </div>
    </div>
  );
}

NoteDetailPage.propTypes = {
  noteId: PropTypes.string.isRequired,
  onBackToHome: PropTypes.func.isRequired
};

export default NoteDetailPage;