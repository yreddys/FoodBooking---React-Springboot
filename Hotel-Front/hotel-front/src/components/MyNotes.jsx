import React, { useEffect, useState } from 'react';
import { getMyNotes } from './api';

const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    getMyNotes(token)
      .then(res => setNotes(res.data))
      .catch(() => alert('Failed to fetch notes'));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Notes</h2>
      {notes.map((note, idx) => (
        <div key={idx} className="border p-2 mb-2 rounded shadow">
          <h3 className="font-bold">{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MyNotes;
