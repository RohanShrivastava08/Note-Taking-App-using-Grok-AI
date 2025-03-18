import React, { useState, useEffect } from 'react';
import './NoteEditor.css';

const NoteEditor = ({ note, updateNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleChange = () => {
    if (note) {
      updateNote({ ...note, title, content });
    }
  };

  return (
    <div className="note-editor" style={{ background: note?.color || 'transparent' }}>
      {note ? (
        <>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            onBlur={handleChange}
            placeholder="Title"
          />
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            onBlur={handleChange}
            placeholder="Start typing your note..."
          />
        </>
      ) : (
        <div className="empty-state">
          <p>Select a note or create a new one.</p>
        </div>
      )}
    </div>
  );
};

export default NoteEditor;