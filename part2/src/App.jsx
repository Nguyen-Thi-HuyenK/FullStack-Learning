import React from 'react';
import { useState, useEffect } from 'react';
import Note from './components/Note';
import axios from 'axios';


const App = () => {
 
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled');
        setNotes(response.data);
      });
  }, []);
  console.log('render', notes.length, 'notes'
)

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      /* id: String(notes.length + 1), */
    }
    
    axios
      .post ('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(noteObject));
        setNewNote('');
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };
    axios
      .put(url, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id === id ? response.data: note));
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note = {note} toggleImportance={() => {toggleImportanceOf(note.id)}}/>
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