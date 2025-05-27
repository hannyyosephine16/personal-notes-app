import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import NotesList from '../components/NotesList';
import { getActiveNotes, deleteNote, archiveNote, getNote } from '../utils/network-data';
import { LocaleContext } from '../contexts/LocaleContext';
import { AuthContext } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';

function HomePage({ searchQuery, onViewDetail }) {
  const [notes, setNotes] = useState([]);
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);
  const { texts } = useContext(LocaleContext);
  const { setIsLoading } = useContext(AuthContext);
  const { showSuccess, showWarning, showError } = useNotification();
  
  useEffect(() => {
    // Get new data when component mounts
    const fetchNotes = async () => {
      setIsLoadingNotes(true);
      try {
        const { error, data, message } = await getActiveNotes();
        if (error) {
          showError(message || 'Failed to fetch notes');
          setNotes([]);
        } else {
          console.log('Active notes:', data);
          setNotes(data);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
        showError('An error occurred while fetching notes');
        setNotes([]);
      } finally {
        setIsLoadingNotes(false);
      }
    };
    
    fetchNotes();
  }, []);
  
  const onDeleteHandler = async (id) => {
    console.log('HomePage: Deleting note with id:', id);
    
    setIsLoading(true);
    try {
      // Get note information before deleting for notification
      const { error: noteError, data: noteData } = await getNote(id);
      
      if (noteError) {
        showError('Failed to get note information');
        return;
      }
      
      const { error, message } = await deleteNote(id);
      
      if (error) {
        showError(message || 'Failed to delete note');
      } else {
        // Show success notification
        showWarning(`${texts.noteDeleted}`);
        // Update local state after deletion
        setNotes(notes.filter(note => note.id !== id));
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      showError('An error occurred while deleting the note');
    } finally {
      setIsLoading(false);
    }
  };
  
  const onArchiveHandler = async (id) => {
    console.log('HomePage: Archiving note with id:', id);
    
    setIsLoading(true);
    try {
      // Get note information before archiving for notification
      const { error: noteError, data: noteData } = await getNote(id);
      
      if (noteError) {
        showError('Failed to get note information');
        return;
      }
      
      const { error, message } = await archiveNote(id);
      
      if (error) {
        showError(message || 'Failed to archive note');
      } else {
        // Show success notification
        showSuccess(`${texts.noteArchived}`);
        // Update local state after archiving
        setNotes(notes.filter(note => note.id !== id));
      }
    } catch (error) {
      console.error('Error archiving note:', error);
      showError('An error occurred while archiving the note');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddNewNote = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('HomePage: Add new note button clicked');
    onViewDetail('new');
  };
  
  const handleViewNoteDetail = (id) => {
    console.log('HomePage: View note detail for id:', id);
    onViewDetail(id);
  };
  
  const filteredNotes = searchQuery && searchQuery.length > 0
    ? notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : notes;
  
  if (isLoadingNotes) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="homepage">
      <h2>{texts.activeNotes}</h2>
      <NotesList 
        notes={filteredNotes} 
        onDelete={onDeleteHandler} 
        onArchive={onArchiveHandler}
        emptyMessage={texts.emptyNotesMessage}
        onViewDetail={handleViewNoteDetail}
      />
      <div className="homepage__action">
        <button 
          className="action" 
          title={texts.addNote} 
          onClick={handleAddNewNote}
          style={{ 
            position: 'relative', 
            zIndex: 100
          }}
        >
          ➕
        </button>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onViewDetail: PropTypes.func.isRequired
};

export default HomePage;