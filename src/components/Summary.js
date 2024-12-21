import React, { useState } from 'react';

const Summary = ({ note, setSelectedNote, notes, setNotes, generateSummary }) => {
  const [content, setContent] = useState(note.content);

  const updateNote = () => {
    const updatedNotes = notes.map((n) =>
      n.id === note.id
        ? { ...n, content, summary: generateSummary(content) }
        : n
    );
    setNotes(updatedNotes);
    setSelectedNote(null);
  };

  return (
    <div className="note-details">
      <button onClick={() => setSelectedNote(null)}>Back</button>
      <h2>{note.title}</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={updateNote}>Update</button>
    </div>
  );
};

export default Summary;
