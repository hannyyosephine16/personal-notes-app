import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NotesList from '../components/NotesList';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/local-data';

function ArchivesPage({ searchQuery, onViewDetail }) {
  const [archivedNotes, setArchivedNotes] = useState([]);
  
  useEffect(() => {
    // Get fresh data on component mount
    console.log('ArchivesPage: Loading archived notes');
    const archived = getArchivedNotes();
    console.log('Archived notes:', archived);
    setArchivedNotes(archived);
  }, []);
  
  const onDeleteHandler = (id) => {
    console.log('ArchivesPage: Deleting archived note with id:', id);
    deleteNote(id);
    // Update local state after deletion
    setArchivedNotes(getArchivedNotes());
  };
  
  const onUnarchiveHandler = (id) => {
    console.log('ArchivesPage: Unarchiving note with id:', id);
    unarchiveNote(id);
    // Update local state after unarchiving
    setArchivedNotes(getArchivedNotes());
  };
  
  const handleViewNoteDetail = (id) => {
    console.log('ArchivesPage: View note detail for id:', id);
    onViewDetail(id);
  };
  
  const filteredNotes = searchQuery.length > 0
    ? archivedNotes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : archivedNotes;
  
  return (
    <div className="archives-page">
      <h2>Archived Notes</h2>
      <NotesList 
        notes={filteredNotes} 
        onDelete={onDeleteHandler} 
        onArchive={onUnarchiveHandler}
        emptyMessage="Archive is empty. Archive some notes first!"
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