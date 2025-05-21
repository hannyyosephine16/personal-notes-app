import React from 'react';
import PropTypes from 'prop-types';
import NoteCard from './NoteCard';

function NotesList({ notes, onDelete, onArchive, emptyMessage, onViewDetail }) {
  return (
    <div className={notes.length > 0 ? "notes-list" : "notes-list-empty"}>
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteCard 
            key={note.id}
            id={note.id}
            title={note.title}
            body={note.body}
            createdAt={note.createdAt}
            archived={note.archived}
            onDelete={onDelete}
            onArchive={onArchive}
            onViewDetail={onViewDetail}
          />
        ))
      ) : (
        <p>{emptyMessage}</p>
      )}
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  onViewDetail: PropTypes.func.isRequired
};

export default NotesList;