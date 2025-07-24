import React, { useEffect, useState } from 'react';
import { getMyNotes, updateNote, deleteNote } from './api';

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    getMyNotes(token)
      .then(res => setNotes(res.data))
      .catch(() => alert('Failed to fetch notes'));
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
      alert('Note updated');
    } catch (err) {
      alert('Failed to update note');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id, token);
        fetchNotes();
        alert('Note deleted');
      } catch (err) {
        alert('Failed to delete note');
      }
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary mb-4">My Notes</h2>

      {notes.length === 0 ? (
        <div className="alert alert-info text-center">No notes found.</div>
      ) : (
        <div className="row">
          {notes.map((note) => (
            <div key={note.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">{note.title}</h5>

                  {editNoteId === note.id ? (
                    <>
                      <textarea
                        className="form-control mb-2"
                        rows="4"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleSave(note.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setEditNoteId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="card-text text-muted">{note.content}</p>
                      <div className="mt-3 d-flex justify-content-between">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(note)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(note.id)}
                        >
                          Delete
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
