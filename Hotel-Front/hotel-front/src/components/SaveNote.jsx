// src/components/SaveNote.jsx
import React, { useState } from 'react';
import { saveNote } from './api';

const SaveNote = () => {
  const [note, setNote] = useState({ title: '', content: '' });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await saveNote(note, token);
      alert('Note saved successfully');
      setNote({ title: '', content: '' });
    } catch (error) {
      alert('Failed to save note');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Save a New Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Content</label>
          <textarea
            name="content"
            value={note.content}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Note
        </button>
      </form>
    </div>
  );
};

export default SaveNote;
