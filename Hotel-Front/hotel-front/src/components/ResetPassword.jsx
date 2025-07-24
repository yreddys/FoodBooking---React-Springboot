import React, { useState } from 'react';
import { resetPassword } from './api';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(otp, newPassword);
      setMessage('✅ Password reset successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage('❌ Failed to reset password. Please check OTP and try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h4 className="text-center mb-3 text-success">Reset Password</h4>
        <form onSubmit={handleReset}>
          <div className="mb-3">
            <label className="form-label">OTP</label>
            <input
              type="text"
              className="form-control"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP sent to your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 shadow-sm">
            Reset Password
          </button>
          {message && (
            <div className="alert alert-info mt-3 text-center p-2">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
