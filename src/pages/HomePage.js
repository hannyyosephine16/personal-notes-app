// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import NotesList from '../components/NotesList';
// import { getActiveNotes, deleteNote, archiveNote } from '../utils/local-data';

// function HomePage({ searchQuery, onViewDetail, notesChanged, onNotesChange }) {
//   const [notes, setNotes] = useState([]);
  
//   // Update useEffect to respond to notesChanged
//   useEffect(() => {
//     setNotes(getActiveNotes());
//   }, [notesChanged]);
  
//   const onDeleteHandler = (id) => {
//     deleteNote(id);
//     setNotes(getActiveNotes());
//     onNotesChange(); // Notify parent about the change
//   };
  
//   const onArchiveHandler = (id) => {
//     archiveNote(id);
//     setNotes(getActiveNotes());
//     onNotesChange(); // Notify parent about the change
//   };
  
//   const filteredNotes = searchQuery.length > 0
//     ? notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
//     : notes;
  
//   return (
//     <div className="homepage">
//       <h2>Active Notes</h2>
//       <NotesList 
//         notes={filteredNotes} 
//         onDelete={onDeleteHandler} 
//         onArchive={onArchiveHandler}
//         emptyMessage="No notes found. Create one now!"
//         onViewDetail={onViewDetail}
//       />
//       <div className="homepage__action">
//         <button className="action" title="Add New Note" onClick={() => onViewDetail('new')}>
//           ➕
//         </button>
//       </div>
//     </div>
//   );
// }

// HomePage.propTypes = {
//   searchQuery: PropTypes.string.isRequired,
//   onViewDetail: PropTypes.func.isRequired,
//   notesChanged: PropTypes.number,
//   onNotesChange: PropTypes.func
// };

// export default HomePage;

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
  
  // const handleAddNewNote = (event) => {
  //   if (event) {
  //     event.preventDefault();
  //   }
  //   console.log('HomePage: Add new note button clicked');
  //   onViewDetail('new');
  // };

  const handleAddNewNote = (event) => {
  event.preventDefault();
  console.log('Add button clicked');
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