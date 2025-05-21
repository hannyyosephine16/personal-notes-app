import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NotesList from '../components/NotesList';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/local-data';

function HomePage({ searchQuery, onViewDetail }) {
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    // Get fresh data on component mount
    console.log('HomePage: Loading active notes');
    const activeNotes = getActiveNotes();
    console.log('Active notes:', activeNotes);
    setNotes(activeNotes);
  }, []);
  
  const onDeleteHandler = (id) => {
    console.log('HomePage: Deleting note with id:', id);
    deleteNote(id);
    // Update local state after deletion
    setNotes(getActiveNotes());
  };
  
  const onArchiveHandler = (id) => {
    console.log('HomePage: Archiving note with id:', id);
    archiveNote(id);
    // Update local state after archiving
    setNotes(getActiveNotes());
  };
  
  // Fixed Add New Note handler
  const handleAddNewNote = (event) => {
    // Always prevent default and stop propagation
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
  
  const filteredNotes = searchQuery.length > 0
    ? notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : notes;
  
  return (
    <div className="homepage">
      <h2>Active Notes</h2>
      <NotesList 
        notes={filteredNotes} 
        onDelete={onDeleteHandler} 
        onArchive={onArchiveHandler}
        emptyMessage="No notes found. Create one now!"
        onViewDetail={handleViewNoteDetail}
      />
      <div className="homepage__action">
        <button 
          className="action" 
          title="Add New Note" 
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