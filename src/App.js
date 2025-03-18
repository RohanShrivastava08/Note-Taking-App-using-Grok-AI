import React, { useState, useEffect } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [selectedNote, setSelectedNote] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      date: new Date().toLocaleString(),
      color: getRandomGradient(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) setSelectedNote(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getRandomGradient = () => {
    const gradients = [
      'linear-gradient(135deg, #667eea, #764ba2)',
      'linear-gradient(135deg, #ff6b6b, #feca57)',
      'linear-gradient(135deg, #48c6ef, #6f86d6)',
      'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <header>
        <h1>Notes</h1>
        <div className="header-actions">
          <button onClick={toggleTheme} className="theme-toggle">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>
      <div className="main">
        <NoteList 
          notes={notes} 
          addNote={addNote} 
          setSelectedNote={setSelectedNote} 
          deleteNote={deleteNote} 
          selectedNote={selectedNote}
        />
        <NoteEditor 
          note={selectedNote} 
          updateNote={updateNote} 
        />
      </div>
      <button className="fab" onClick={addNote}>+</button>
    </div>
  );
}

export default App;