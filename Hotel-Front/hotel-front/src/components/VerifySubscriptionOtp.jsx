import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifySubscriptionOtp } from './api';

const VerifySubscriptionOtp = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email');

  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    try {
      await verifySubscriptionOtp(otp);
      setVerified(true);
      setError('');

      setTimeout(() => {
        navigate('/'); // ✅ Redirect to home after 2 seconds
      }, 2000);
    } catch (err) {
      setError('Invalid OTP or expired.');
    }
  };

  return (
    <div className="container py-5 text-center">
      <h3>🔐 Email Verification</h3>
      <p>We’ve sent an OTP to: <strong>{email}</strong></p>

      <div className="col-md-4 mx-auto mt-4">
        <input
          type="text"
          className="form-control text-center"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="btn btn-success mt-3 w-100" onClick={handleVerify}>
          ✅ Verify
        </button>

        {verified && (
          <div className="alert alert-success mt-3">
            🎉 Email verified! Redirecting to home...
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3">{error}</div>
        )}
      </div>
    </div>
  );
};

export default VerifySubscriptionOtp;
