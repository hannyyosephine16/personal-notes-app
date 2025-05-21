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

  const handleCardClick = (event) => {
    event.preventDefault();
    console.log('Card clicked for note:', id);
    onViewDetail(id);
  };

  return (
    <div 
      className="note-item" 
      style={{ 
        borderTopColor: archived ? '#F39C12' : '#BB86FC', 
        cursor: 'pointer',
        position: 'relative'
      }}
      onClick={handleCardClick}
    >
      <h3 
        className="note-item__title" 
        style={{ cursor: 'pointer' }}
      >
        {title}
      </h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="note-item__body" dangerouslySetInnerHTML={{ __html: body }}></div>
      <div style={{ 
        marginTop: '16px', 
        display: 'flex', 
        gap: '8px',
        position: 'relative',
        zIndex: 10
      }}>
        <button 
          onClick={handleDelete} 
          className="action" 
          title="Delete"
          style={{ 
            backgroundColor: '#CF6679',
            position: 'relative',
            zIndex: 20
          }}
        >
          🗑
        </button>
        <button 
          onClick={handleArchive} 
          className="action" 
          title={archived ? "Unarchive" : "Archive"}
          style={{ 
            backgroundColor: archived ? '#03DAC6' : '#F39C12',
            position: 'relative',
            zIndex: 20
          }}
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
