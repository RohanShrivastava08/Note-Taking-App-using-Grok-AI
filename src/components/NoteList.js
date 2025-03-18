import React from 'react';
import './NoteList.css';

const NoteList = ({ notes, addNote, setSelectedNote, deleteNote, selectedNote }) => {
  return (
    <div className="note-list">
      {notes.map(note => (
        <div 
          key={note.id} 
          className={`note-item ${selectedNote?.id === note.id ? 'active' : ''}`}
          onClick={() => setSelectedNote(note)}
          style={{ background: note.color }}
        >
          <div className="note-preview">
            <h3>{note.title || 'Untitled'}</h3>
            <p>{note.content.slice(0, 50) || 'No content'}...</p>
            <small>{note.date}</small>
          </div>
          <button 
            className="delete-btn" 
            onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;