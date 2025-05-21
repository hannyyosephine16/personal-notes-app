import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';
import { showFormattedDate } from '../utils/index';

function NoteDetailPage({ noteId, onBackToHome }) {
  const [note, setNote] = useState(null);
  
  useEffect(() => {
    const selectedNote = getNote(noteId);
    if (selectedNote) {
      setNote(selectedNote);
    } else {
      onBackToHome();
    }
  }, [noteId, onBackToHome]);
  
  const onDeleteHandler = (id) => {
    console.log('Deleting note with id:', id);
    deleteNote(id);
    onBackToHome();
  };
  
  const onArchiveHandler = (id) => {
    console.log('Toggling archive status for note with id:', id);
    if (note.archived) {
      unarchiveNote(id);
      setNote({ ...note, archived: false });
    } else {
      archiveNote(id);
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
          onClick={() => onDeleteHandler(note.id)}
          style={{ backgroundColor: '#CF6679' }}
          title="Delete"
        >
          🗑️
        </button>
        <button 
          className="action" 
          onClick={() => onArchiveHandler(note.id)}
          style={{ backgroundColor: note.archived ? '#03DAC6' : '#F39C12' }}
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

// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';
// import { showFormattedDate } from '../utils/index';

// function NoteDetailPage({ noteId, onBackToHome, onNotesChange }) {
//   const [note, setNote] = useState(null);
  
//   useEffect(() => {
//     const selectedNote = getNote(noteId);
//     if (selectedNote) {
//       setNote(selectedNote);
//     } else {
//       onBackToHome();
//     }
//   }, [noteId, onBackToHome]);
  
//   const onDeleteHandler = (id) => {
//     deleteNote(id);
//     onNotesChange(); // Notify parent about the change
//     onBackToHome();
//   };
  
//   const onArchiveHandler = (id) => {
//     if (note.archived) {
//       unarchiveNote(id);
//       setNote({ ...note, archived: false });
//     } else {
//       archiveNote(id);
//       setNote({ ...note, archived: true });
//     }
//     onNotesChange(); // Notify parent about the change
//   };
  
//   if (!note) {
//     return <p>Loading...</p>;
//   }
  
//   return (
//     <div className="detail-page">
//       <h2 className="detail-page__title">{note.title}</h2>
//       <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
//       <div className="detail-page__body" dangerouslySetInnerHTML={{ __html: note.body }}></div>
//       <div className="detail-page__action">
//         <button 
//           className="action" 
//           onClick={() => onDeleteHandler(note.id)}
//           style={{ backgroundColor: '#CF6679' }}
//           title="Delete"
//         >
//           🗑️
//         </button>
//         <button 
//           className="action" 
//           onClick={() => onArchiveHandler(note.id)}
//           style={{ backgroundColor: note.archived ? '#03DAC6' : '#F39C12' }}
//           title={note.archived ? "Unarchive" : "Archive"}
//         >
//           {note.archived ? '⟲' : '📁'}
//         </button>
//       </div>
//     </div>
//   );
// }

// NoteDetailPage.propTypes = {
//   noteId: PropTypes.string.isRequired,
//   onBackToHome: PropTypes.func.isRequired,
//   onNotesChange: PropTypes.func
// };

// export default NoteDetailPage;