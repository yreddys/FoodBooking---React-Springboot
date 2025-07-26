// src/components/SubscribeForm.jsx
import React, { useState } from 'react';
import { sendSubscriptionOtp, verifySubscriptionOtp } from './api';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter OTP
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await sendSubscriptionOtp(email);
      setStep(2);
      setMessage('📩 OTP sent to your email.');
    } catch (err) {
      setMessage(
        err.response?.data || '❌ Failed to send OTP. Try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await verifySubscriptionOtp({ email, otp });
      setMessage('✅ Subscription complete! You will receive updates.');
      setStep(3); // subscription done
    } catch (err) {
      setMessage(
        err.response?.data || '❌ Invalid OTP. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="text-center mb-3 text-primary">📬 Subscribe for Updates</h4>

            {message && (
              <div className="alert alert-info text-center py-2">{message}</div>
            )}

            {step === 1 && (
              <form onSubmit={handleSendOtp}>
                <div className="mb-3">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOtp}>
                <div className="mb-3">
                  <label>Enter OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the OTP sent to your email"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-success"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Verify & Subscribe'}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="text-center text-success fw-bold mt-3">
                🎉 Thank you for subscribing!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeForm;
