import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NotesList from '../components/NotesList';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/local-data';

function ArchivesPage({ searchQuery, onViewDetail }) {
  const [archivedNotes, setArchivedNotes] = useState([]);
  
  useEffect(() => {
    // Dapatkan data baru pada pemuatan komponen
    console.log('ArchivesPage: Loading archived notes');
    const archived = getArchivedNotes();
    console.log('Archived notes:', archived);
    setArchivedNotes(archived);
  }, []);
  
  const onDeleteHandler = (id) => {
    console.log('ArchivesPage: Deleting archived note with id:', id);
    deleteNote(id);
    // Perbarui state lokal setelah penghapusan
    setArchivedNotes(getArchivedNotes());
  };
  
  const onUnarchiveHandler = (id) => {
    console.log('ArchivesPage: Unarchiving note with id:', id);
    unarchiveNote(id);
    // Perbarui state lokal setelah pembatalan arsip
    setArchivedNotes(getArchivedNotes());
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