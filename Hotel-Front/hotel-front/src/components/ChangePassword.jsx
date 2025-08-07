import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from './api';

const ChangePassword = () => {
  const userName = localStorage.getItem('userName') || ''; // auto-filled from login
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      setMessage('Please fill in both password fields.');
      return;
    }

    try {
      const response = await changePassword({ userName, oldPassword, newPassword });
      setMessage(response.data);

      localStorage.removeItem('token');
      localStorage.removeItem('roles');
      localStorage.removeItem('forcePasswordChange');
      localStorage.removeItem('userName');

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data || 'Failed to change password.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h4 className="text-center text-primary mb-3">Change Password</h4>

        <form onSubmit={handleChangePassword}>
          <div className="mb-3">
            <label className="form-label">Email / Username</label>
            <input
              type="email"
              className="form-control"
              value={userName}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Old Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Password
          </button>
        </form>

        {message && (
          <div className="alert alert-info mt-3" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
