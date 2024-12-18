import React from 'react';
import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/note';



const App = () => {
 
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes=> {
        setNotes(initialNotes);
      })
  }, []);


  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
  
    noteService
      .create(noteObject)
      .then(returnedNote => {
        console.log('New note returned from server:', returnedNote);  // Log the returned note to confirm its structure
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      })
      .catch(error => {
        console.error('Error creating note:', error);
      });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const toggleImportanceOf = (id) => {
    /* const url = `http://localhost:3001/notes/${id}`; */
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote: note));
      })
      .catch(error => {
        alert (
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id));
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>Show {showAll? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
            key={note.id} 
            note = {note} 
            toggleImportance={() => {toggleImportanceOf(note.id)}}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange} />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default App;