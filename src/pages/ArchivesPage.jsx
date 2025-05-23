import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NotesList from '../components/NotesList';
import { getArchivedNotes, deleteNote, unarchiveNote, getNote } from '../utils/local-data';
import { useNotification } from '../contexts/NotificationContext';

function ArchivesPage({ searchQuery, onViewDetail }) {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const { showSuccess, showWarning } = useNotification();
  
  useEffect(() => {
    // Dapatkan data baru pada pemuatan komponen
    console.log('ArchivesPage: Loading archived notes');
    const archived = getArchivedNotes();
    console.log('Archived notes:', archived);
    setArchivedNotes(archived);
  }, []);
  
  const onDeleteHandler = (id) => {
    console.log('ArchivesPage: Deleting archived note with id:', id);
    // Get note information before deleting for notification
    const noteToDelete = getNote(id);
    
    if (noteToDelete) {
      deleteNote(id);
      // Show warning notification
      showWarning(`Catatan "${noteToDelete.title}" telah dihapus!`);
      // Perbarui state lokal setelah penghapusan
      setArchivedNotes(getArchivedNotes());
    }
  };
  
  const onUnarchiveHandler = (id) => {
    console.log('ArchivesPage: Unarchiving note with id:', id);
    // Get note information before unarchiving for notification
    const noteToUnarchive = getNote(id);
    
    if (noteToUnarchive) {
      unarchiveNote(id);
      // Show success notification
      showSuccess(`Catatan "${noteToUnarchive.title}" telah dipindahkan ke aktif!`);
      // Perbarui state lokal setelah pembatalan arsip
      setArchivedNotes(getArchivedNotes());
    }
  };
  
  const handleViewNoteDetail = (id) => {
    console.log('ArchivesPage: View note detail for id:', id);
    onViewDetail(id);
  };
  
  const filteredNotes = searchQuery && searchQuery.length > 0
    ? archivedNotes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : archivedNotes;
  
  return (
    <div className="archives-page">
      <h2>Catatan Terarsip</h2>
      <NotesList 
        notes={filteredNotes} 
        onDelete={onDeleteHandler} 
        onArchive={onUnarchiveHandler}
        emptyMessage="Arsip kosong. Arsipkan beberapa catatan terlebih dahulu!"
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