import { useEffect, useState } from 'react';
import { addNote } from './AddNotes.js';
import { getAllNotes } from './GetNotes.js';
import './style.css';

export default function App() {
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState('Loading saved notes...');

  useEffect(() => {
    async function loadNotes() {
      try {
        const savedNotes = await getAllNotes();
        setNotes(savedNotes);
        setMessage('Your notes are ready.');
      } catch (error) {
        console.error('Error loading notes:', error);
        setMessage('Could not load saved notes.');
      }
    }

    loadNotes();
  }, []);

  async function handleAddNote(event) {
    event.preventDefault();

    const text = noteText.trim();

    if (!text) {
      setMessage('Please enter a note first.');
      return;
    }

    try {
      await addNote(text);

      const savedNotes = await getAllNotes();
      setNotes(savedNotes);
      setNoteText('');
      setMessage('Note saved successfully.');
    } catch (error) {
      console.error('Error saving note:', error);
      setMessage('Could not save the note. Please try again.');
    }
  }

  return (
    <main className="page">
      <section className="app-card">
        <div className="eyebrow">PERSONAL WORKSPACE</div>

        <h1>Offline Notes</h1>

        <p className="intro">
          Capture a thought now and keep your notes close at hand.
        </p>

        <form className="note-form" onSubmit={handleAddNote}>
          <label htmlFor="noteText">New note</label>

          <textarea
            id="noteText"
            value={noteText}
            onChange={(event) => setNoteText(event.target.value)}
            placeholder="Write a note..."
            rows={3}
          />

          <button type="submit">Add note</button>
        </form>

        <p className="status" role="status">
          {message}
        </p>

        <section className="notes-section">
          <div className="section-heading">
            <h2>Your notes</h2>
            <span>{notes.length} saved</span>
          </div>

          {notes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✎</div>
              <strong>No notes yet</strong>
              <p>Your saved notes will appear here.</p>
            </div>
          ) : (
            <ul className="notes-list">
              {notes.map((note) => (
                <li className="note-item" key={note.id}>
                  <p>{note.text}</p>
                  <time>
                    {new Date(note.createdAt).toLocaleString()}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="footer-note">
          Your notes are stored in your browser.
        </p>
      </section>
    </main>
  );
}