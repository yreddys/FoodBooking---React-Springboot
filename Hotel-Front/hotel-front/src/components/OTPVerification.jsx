import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from './api'; // ✅ import from your api.jsx

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyOtp(otp); // ✅ using from api.jsx
      setSuccess(response.data); // “Email verified successfully.”
      setError('');

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data || 'Invalid or expired OTP.');
      setSuccess('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center text-primary mb-3">Verify OTP</h3>

        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">Enter OTP</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
