import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NotesList from '../components/NotesList';
import { getActiveNotes, deleteNote, archiveNote, getNote } from '../utils/local-data';
import { useNotification } from '../contexts/NotificationContext';

function HomePage({ searchQuery, onViewDetail }) {
  const [notes, setNotes] = useState([]);
  const { showSuccess, showWarning } = useNotification();
  
  useEffect(() => {
    // Dapatkan data baru pada pemuatan komponen
    console.log('HomePage: Loading active notes');
    const activeNotes = getActiveNotes();
    console.log('Active notes:', activeNotes);
    setNotes(activeNotes);
  }, []);
  
  const onDeleteHandler = (id) => {
    console.log('HomePage: Deleting note with id:', id);
    // Get note information before deleting for notification
    const noteToDelete = getNote(id);
    
    if (noteToDelete) {
      deleteNote(id);
      // Show success notification
      showWarning(`Catatan "${noteToDelete.title}" telah dihapus!`);
      // Perbarui state lokal setelah penghapusan
      setNotes(getActiveNotes());
    }
  };
  
  const onArchiveHandler = (id) => {
    console.log('HomePage: Archiving note with id:', id);
    // Get note information before archiving for notification
    const noteToArchive = getNote(id);
    
    if (noteToArchive) {
      archiveNote(id);
      // Show success notification
      showSuccess(`Catatan "${noteToArchive.title}" telah diarsipkan!`);
      // Perbarui state lokal setelah pengarsipan
      setNotes(getActiveNotes());
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
  
  return (
    <div className="homepage">
      <h2>Catatan Aktif</h2>
      <NotesList 
        notes={filteredNotes} 
        onDelete={onDeleteHandler} 
        onArchive={onArchiveHandler}
        emptyMessage="Tidak ada catatan. Buat catatan baru sekarang!"
        onViewDetail={handleViewNoteDetail}
      />
      <div className="homepage__action">
        <button 
          className="action" 
          title="Tambah Catatan Baru" 
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