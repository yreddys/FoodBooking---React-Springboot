import React, { useEffect, useState } from 'react';
import { getMyNotes, updateNote, deleteNote } from './api';

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    getMyNotes(token)
      .then(res => setNotes(res.data))
      .catch(() => alert('⚠️ Failed to fetch notes'));
  };

  const handleEdit = (note) => {
    setEditNoteId(note.id);
    setEditedContent(note.content);
  };

  const handleSave = async (id) => {
    try {
      await updateNote(id, { content: editedContent }, token);
      setEditNoteId(null);
      fetchNotes();
      alert('✅ Note updated');
    } catch (err) {
      alert('❌ Failed to update note');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id, token);
        fetchNotes();
        alert('🗑️ Note deleted');
      } catch (err) {
        alert('❌ Failed to delete note');
      }
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary mb-4">📒 My Notes</h2>

      {/* 🔍 Bootstrap 5 styled Search Bar */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8 col-lg-6">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-light border-end-0">🔍</span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search notes by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="alert alert-info text-center">No notes found.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredNotes.map((note) => (
            <div key={note.id} className="col">
              <div className="card h-100 shadow-sm border rounded-4 d-flex flex-column">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-success fw-bold">{note.title}</h5>

                  {editNoteId === note.id ? (
                    <>
                      <textarea
                        className="form-control mb-3"
                        rows="4"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />
                      <div className="mt-auto d-flex gap-2 justify-content-end">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleSave(note.id)}
                        >
                          💾 Save
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => setEditNoteId(null)}
                        >
                          ❌ Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="card-text text-muted flex-grow-1">{note.content}</p>
                      <div className="mt-auto d-flex justify-content-between">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleEdit(note)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(note.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyNotes;
