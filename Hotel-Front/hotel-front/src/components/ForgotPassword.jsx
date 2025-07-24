import React, { useState } from 'react';
import { forgotPassword } from './api';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage('✅ OTP sent to your email address.');
      localStorage.setItem("resetEmail", email);
      navigate("/reset-password");
    } catch (err) {
      setMessage('❌ Failed to send OTP. Please check your email.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h4 className="text-center mb-3 text-primary">Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 shadow-sm">
            Send OTP
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

export default ForgotPassword;
