import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils/index';
import { LocaleContext } from '../contexts/LocaleContext';
import { AuthContext } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import ConfirmationDialog from '../components/ConfirmationDialog';
import LoadingSpinner from '../components/LoadingSpinner';

function NoteDetailPage({ noteId, onBackToHome }) {
  const [note, setNote] = useState(null);
  const [isLoadingNote, setIsLoadingNote] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  const { texts } = useContext(LocaleContext);
  const { setIsLoading } = useContext(AuthContext);
  const { showSuccess, showWarning, showError } = useNotification();
  
  useEffect(() => {
    console.log('NoteDetailPage: Loading note with id:', noteId);
    
    const fetchNote = async () => {
      setIsLoadingNote(true);
      try {
        const { error, data, message } = await getNote(noteId);
        if (error) {
          showError(message || 'Failed to fetch note');
          // Navigate to 404 page if note not found
          window.history.pushState({}, '', '/404');
          onBackToHome();
        } else {
          console.log('Note found:', data);
          setNote(data);
        }
      } catch (error) {
        console.error('Error fetching note:', error);
        showError('An error occurred while fetching the note');
        // Navigate to 404 page if error
        window.history.pushState({}, '', '/404');
        onBackToHome();
      } finally {
        setIsLoadingNote(false);
      }
    };
    
    fetchNote();
  }, [noteId, onBackToHome]);
  
  const onDeleteHandler = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Show custom delete confirmation dialog
    setShowDeleteConfirmation(true);
  };
  
  const confirmDelete = async () => {
    console.log('NoteDetailPage: Deleting note with id:', note.id);
    
    // Store title before deletion for notification
    const noteTitle = note.title;
    
    setIsLoading(true);
    try {
      const { error, message } = await deleteNote(note.id);
      
      if (error) {
        showError(message || 'Failed to delete note');
      } else {
        // Show warning notification
        showWarning(`${texts.noteDeleted}`);
        // Navigate back to home
        onBackToHome();
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      showError('An error occurred while deleting the note');
    } finally {
      setIsLoading(false);
      setShowDeleteConfirmation(false);
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };
  
  const onArchiveHandler = async (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('NoteDetailPage: Toggling archive status for note with id:', note.id);
    
    setIsLoading(true);
    try {
      if (note.archived) {
        const { error, message } = await unarchiveNote(note.id);
        
        if (error) {
          showError(message || 'Failed to unarchive note');
        } else {
          setNote({ ...note, archived: false });
          showSuccess(`${texts.noteUnarchived}`);
        }
      } else {
        const { error, message } = await archiveNote(note.id);
        
        if (error) {
          showError(message || 'Failed to archive note');
        } else {
          setNote({ ...note, archived: true });
          showSuccess(`${texts.noteArchived}`);
        }
      }
    } catch (error) {
      console.error('Error toggling archive status:', error);
      showError('An error occurred while updating the note');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoadingNote) {
    return <LoadingSpinner />;
  }
  
  if (!note) {
    return <p>{texts.loading}</p>;
  }
  
  return (
    <>
      <div className="detail-page">
        <h2 className="detail-page__title">{note.title}</h2>
        <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
        <div className="detail-page__body" dangerouslySetInnerHTML={{ __html: note.body }}></div>
        <div className="detail-page__action">
          <button 
            className="action" 
            onClick={onDeleteHandler}
            style={{ 
              backgroundColor: 'var(--error)',
              position: 'relative',
              zIndex: 100
            }}
            title={texts.delete}
          >
            🗑️
          </button>
          <button 
            className="action" 
            onClick={onArchiveHandler}
            style={{ 
              backgroundColor: note.archived ? 'var(--secondary)' : 'var(--warning)',
              position: 'relative',
              zIndex: 100
            }}
            title={note.archived ? texts.unarchive : texts.archive}
          >
            {note.archived ? '⟲' : '📁'}
          </button>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        message={`${texts.deleteConfirm} "${note.title}"?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}

NoteDetailPage.propTypes = {
  noteId: PropTypes.string.isRequired,
  onBackToHome: PropTypes.func.isRequired
};

export default NoteDetailPage;