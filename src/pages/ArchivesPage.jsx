import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import NotesList from '../components/NotesList';
import { getArchivedNotes, deleteNote, unarchiveNote, getNote } from '../utils/network-data';
import { LocaleContext } from '../contexts/LocaleContext';
import { AuthContext } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';

function ArchivesPage({ searchQuery, onViewDetail }) {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);
  const { texts } = useContext(LocaleContext);
  const { setIsLoading } = useContext(AuthContext);
  const { showSuccess, showWarning, showError } = useNotification();
  
  useEffect(() => {
    // Get new data when component mounts
    const fetchNotes = async () => {
      setIsLoadingNotes(true);
      try {
        const { error, data, message } = await getArchivedNotes();
        if (error) {
          showError(message || 'Failed to fetch archived notes');
          setArchivedNotes([]);
        } else {
          console.log('Archived notes:', data);
          setArchivedNotes(data);
        }
      } catch (error) {
        console.error('Error fetching archived notes:', error);
        showError('An error occurred while fetching archived notes');
        setArchivedNotes([]);
      } finally {
        setIsLoadingNotes(false);
      }
    };
    
    fetchNotes();
  }, []);
  
  const onDeleteHandler = async (id) => {
    console.log('ArchivesPage: Deleting archived note with id:', id);
    
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
        // Show warning notification
        showWarning(`${texts.noteDeleted}`);
        // Update local state after deletion
        setArchivedNotes(archivedNotes.filter(note => note.id !== id));
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      showError('An error occurred while deleting the note');
    } finally {
      setIsLoading(false);
    }
  };
  
  const onUnarchiveHandler = async (id) => {
    console.log('ArchivesPage: Unarchiving note with id:', id);
    
    setIsLoading(true);
    try {
      // Get note information before unarchiving for notification
      const { error: noteError, data: noteData } = await getNote(id);
      
      if (noteError) {
        showError('Failed to get note information');
        return;
      }
      
      const { error, message } = await unarchiveNote(id);
      
      if (error) {
        showError(message || 'Failed to unarchive note');
      } else {
        // Show success notification
        showSuccess(`${texts.noteUnarchived}`);
        // Update local state after unarchiving
        setArchivedNotes(archivedNotes.filter(note => note.id !== id));
      }
    } catch (error) {
      console.error('Error unarchiving note:', error);
      showError('An error occurred while unarchiving the note');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewNoteDetail = (id) => {
    console.log('ArchivesPage: View note detail for id:', id);
    onViewDetail(id);
  };
  
  const filteredNotes = searchQuery && searchQuery.length > 0
    ? archivedNotes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : archivedNotes;
  
  if (isLoadingNotes) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="archives-page">
      <h2>{texts.archivedNotes}</h2>
      <NotesList 
        notes={filteredNotes} 
        onDelete={onDeleteHandler} 
        onArchive={onUnarchiveHandler}
        emptyMessage={texts.emptyArchiveMessage}
        onViewDetail={handleViewNoteDetail}
      />
    </div>
  );
}

ArchivesPage.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onViewDetail: PropTypes.func.isRequired
};

export default ArchivesPage;