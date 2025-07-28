
import React, { useState, useEffect } from 'react';
import { publishUpdate, getProfile } from './api'; 
import { useNavigate } from 'react-router-dom';

const AdminUpdateForm = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    getProfile(token)
      .then(res => {
        const roles = res.data.roles || [];
        setIsAdmin(roles.includes('ROLE_ADMIN'));
      })
      .catch(() => {
        alert('Unauthorized. Redirecting to home.');
        navigate('/');
      });
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !body) {
      alert('Both subject and body are required!');
      return;
    }

    try {
      await publishUpdate({ subject, body }, token);
      alert('✅ Update published and sent to subscribers!');
      setSubject('');
      setBody('');
    } catch (err) {
      alert('❌ Failed to publish update');
    }
  };

  if (!isAdmin) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">⛔ You do not have access to this page.</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary text-center">📢 Publish Update</h2>

      <form onSubmit={handleSubmit} className="col-md-8 mx-auto shadow p-4 bg-light rounded-4">
        <div className="mb-3">
          <label className="form-label fw-bold">Subject</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter update subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Body</label>
          <textarea
            className="form-control"
            placeholder="Enter update message"
            rows="5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success w-100">
          📤 Publish Update
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateForm;
