// src/SaveNote.js
import React, { useState, useEffect } from 'react';
import { saveNote, getProfile, getMyNotes } from './api';
import { useNavigate } from 'react-router-dom';

const SaveNote = () => {
  const [note, setNote] = useState({ title: '', content: '' });
  const [isPremium, setIsPremium] = useState(false);
  const [notesCount, setNotesCount] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkLimit = async () => {
      try {
        const profileRes = await getProfile(token);
        const notesRes = await getMyNotes(token);

        setIsPremium(profileRes.data.premium);
        setNotesCount(notesRes.data.length);

        if (!profileRes.data.premium && notesRes.data.length >= 5) {
          navigate('/subscribe'); // 🔄 redirect when limit reached
        }
      } catch (err) {
        console.error('Failed to fetch user info', err);
      }
    };

    checkLimit();
  }, [token, navigate]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveNote(note, token);
      alert('✅ Note saved successfully');
      setNote({ title: '', content: '' });
      setNotesCount(notesCount + 1);
    } catch (error) {
      alert('❌ Failed to save note');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h3 className="card-title text-center text-primary mb-4">📝 Save a New Note</h3>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-semibold">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={handleChange}
                    placeholder="Enter note title"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="form-label fw-semibold">Content</label>
                  <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    value={note.content}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Write your note here..."
                    required
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    💾 Save Note
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveNote;
