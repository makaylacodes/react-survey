import React, {useState, useEffect} from 'react';
import Note from './Note';
import noteService from './services/notes';
import './styles.css';

const Footer = () => {
  return (
    <footer id="footer">
        <p >&copy; Copyright 2022 <br />
        Built with &#x2661; by <a className="link" href="https://github.com/makaylacodes/react-to-do-list" target="_blank">
        Makayla Anderson-Tucker
        </a>
        </p>
      </footer>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  
  const addNote = (event) => {
    event.preventDefault();
    const newObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < .5,
      id: notes.length + 1
    };

    noteService
    .create(newObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    });


   
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };
  const notesToShow = showAll ? notes : notes.filter(note => note.important ===true);

  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        console.log("promise fulfilled");
        setNotes(initialNotes);
      });
  };

  useEffect(hook, []);
  
  console.log('render', notes.length, 'notes');

  const toggleImportanceOf = (id) => {
    console.log(`Importance of ${id} needs to be toggled`);
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert( `the note '${note.content}' has already been deleted from the server `)
        setNotes(notes.filter(n => n.id !== id))
      })
  };

  return (
    <div className='app'>
      <div className='card'>
        <h1 className='title'>To-Do List</h1>
      
      <form onSubmit={addNote} className="form">
        <h3>Enter a task <input value={newNote} onChange={handleNoteChange}/> <button type="submit">Save</button> </h3>
      </form> <button onClick ={()=> setShowAll(!showAll)} >
        Show {showAll ? 'important tasks' : 'all tasks'}
      </button>
      
      <ol>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ol>
      
      </div>
      <Footer />

      

    </div>
  );
};

export default App;
