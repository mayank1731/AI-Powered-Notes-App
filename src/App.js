import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Main'; 
import Note from './components/Note';
import Summary from './components/Summary';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addNote = (title, content) => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      summary: "Generating summary...", 
    };
    setNotes([newNote, ...notes]);
  };

  useEffect(() => {
    const fetchSummary = async () => {
      const lastNote = notes[0]; 
      if (lastNote && lastNote.summary === "Generating summary...") {
        try {
          setIsLoading(true);

          // Prepare form data for the API request
          const formdata = new FormData();
          formdata.append("key", "cbb34d9bc0a380f8b9e06133091571db");
          formdata.append("txt", lastNote.content);
          formdata.append("sentences", "3"); 

          const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
          };

          const response = await fetch("https://api.meaningcloud.com/summarization-1.0", requestOptions);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();

          const updatedNotes = notes.map((note) =>
            note.id === lastNote.id
              ? { ...note, summary: data.summary || "Summary not available" }
              : note
          );
          setNotes(updatedNotes);
        } catch (error) {
          console.error("Error fetching summary:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSummary();
  }, [notes]);

  return (
    <div>
      <h1>AI-Powered Notes App</h1>
      {isLoading && <p>Loading summaries...</p>}
      {selectedNote ? (
        <Summary
          note={selectedNote}
          setSelectedNote={setSelectedNote}
          notes={notes}
          setNotes={setNotes}
        />
      ) : (
        <>
          <Note addNote={addNote} />
          <Main
            notes={notes}
            setSelectedNote={setSelectedNote}
            setNotes={setNotes}
          />
        </>
      )}
    </div>
  ); 
};

export default App;
