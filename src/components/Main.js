import React from 'react';

const Main = ({ notes, setSelectedNote, setNotes }) => {
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p><strong>Summary:</strong> {note.summary}</p>
          <button onClick={() => setSelectedNote(note)}>View</button>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Main;
