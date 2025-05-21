import React from 'react';
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils/index';

function NoteCard({ id, title, body, createdAt, onDelete, onArchive, archived, onViewDetail }) {
  const handleDelete = (event) => {
    // Always stop propagation to prevent clicking the card
    event.stopPropagation();
    event.preventDefault();
    console.log('Delete button clicked for note:', id);
    onDelete(id);
  };

  const handleArchive = (event) => {
    // Always stop propagation to prevent clicking the card
    event.stopPropagation();
    event.preventDefault();
    console.log('Archive/unarchive button clicked for note:', id);
    onArchive(id);
  };

  const handleCardClick = () => {
    console.log('Card clicked for note:', id);
    onViewDetail(id);
  };

  const handleTitleClick = (event) => {
    // Prevent default behavior and stop propagation
    event.preventDefault();
    event.stopPropagation();
    console.log('Title clicked for note:', id);
    onViewDetail(id);
  };

  return (
    <div 
      className="note-item" 
      style={{ borderTopColor: archived ? '#F39C12' : '#BB86FC', cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <h3 
        className="note-item__title" 
        onClick={handleTitleClick} 
        style={{ cursor: 'pointer' }}
      >
        {title}
      </h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="note-item__body" dangerouslySetInnerHTML={{ __html: body }}></div>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <button 
          onClick={handleDelete} 
          className="action" 
          title="Delete"
          style={{ backgroundColor: '#CF6679' }}
        >
          🗑️
        </button>
        <button 
          onClick={handleArchive} 
          className="action" 
          title={archived ? "Unarchive" : "Archive"}
          style={{ backgroundColor: archived ? '#03DAC6' : '#F39C12' }}
        >
          {archived ? '⟲' : '📁'}
        </button>
      </div>
    </div>
  );
}

NoteCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  archived: PropTypes.bool.isRequired,
  onViewDetail: PropTypes.func.isRequired
};

export default NoteCard;
// import React from 'react';
// import PropTypes from 'prop-types';
// import { showFormattedDate } from '../utils/index';

// function NoteCard({ id, title, body, createdAt, onDelete, onArchive, archived, onViewDetail }) {
//   return (
//     <div className="note-item" style={{ borderTopColor: archived ? '#F39C12' : '#BB86FC' }}>
//       <h3 className="note-item__title" onClick={() => onViewDetail(id)} style={{ cursor: 'pointer' }}>{title}</h3>
//       <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
//       <div className="note-item__body" dangerouslySetInnerHTML={{ __html: body }}></div>
//       <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
//         <button 
//           onClick={() => onDelete(id)} 
//           className="action" 
//           title="Delete"
//           style={{ backgroundColor: '#CF6679' }}
//         >
//           🗑️
//         </button>
//         <button 
//           onClick={() => onArchive(id)} 
//           className="action" 
//           title={archived ? "Unarchive" : "Archive"}
//           style={{ backgroundColor: archived ? '#03DAC6' : '#F39C12' }}
//         >
//           {archived ? '⟲' : '📁'}
//         </button>
//       </div>
//     </div>
//   );
// }

// NoteCard.propTypes = {
//   id: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   body: PropTypes.string.isRequired,
//   createdAt: PropTypes.string.isRequired,
//   onDelete: PropTypes.func.isRequired,
//   onArchive: PropTypes.func.isRequired,
//   archived: PropTypes.bool.isRequired,
//   onViewDetail: PropTypes.func.isRequired
// };

// export default NoteCard;