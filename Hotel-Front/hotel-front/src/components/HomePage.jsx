import React, { useState } from 'react';
import './HomePage.css';
import { sendSubscriptionOtp } from './api'; // Ensure this API function is implemented

const HomePage = () => {
  const [flipped, setFlipped] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCardClick = (e) => {
    // Prevent flip when clicking input or button
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
      setFlipped(!flipped);
    }
  };

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await sendSubscriptionOtp(email);
      alert('📩 OTP sent to your email. Please verify to complete subscription.');
      window.location.href = `/verify-subscription-otp?email=${encodeURIComponent(email)}`;
    } catch (err) {
      const message = err?.response?.data || 'Subscription failed. Try again.';
      alert('❌ ' + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Flip Card Section */}
      <div className="container py-5 d-flex justify-content-center align-items-center min-vh-75 bg-light">
        <div
          className={`flip-card ${flipped ? 'flipped' : ''}`}
          onClick={handleCardClick}
          role="button"
        >
          <div className="flip-card-inner">
            {/* Front */}
            <div className="flip-card-front d-flex flex-column justify-content-center align-items-center bg-white shadow">
              <h2 className="text-primary">Welcome to Note Keeper</h2>
              <p className="text-muted text-center px-3">
                Save your notes securely and access them anytime.
              </p>
              {!flipped && (
                <button className="btn btn-outline-primary mt-3">
                  Click to Explore Features
                </button>
              )}
            </div>

            {/* Back */}
            <div className="flip-card-back d-flex flex-column justify-content-center align-items-center bg-success text-white shadow">
              <h4 className="mb-3">Features</h4>
              <ul className="list-unstyled text-center">
                <li>📝 Save personal notes</li>
                <li>✏️ Edit your notes</li>
                <li>🗑️ Delete notes</li>
                <li>🔐 Private & secure</li>
              </ul>
              <p className="small mt-2">Please sign up to use these features.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Message */}
      <div className="container mt-5 text-center">
        <div className="alert alert-info shadow-sm">
          <h5 className="mb-2">🚀 Developers are working on more features!</h5>
          <p className="mb-0">
            Stay tuned for more exciting updates. <br />
            <strong>Cheers! – Yarraneella</strong> 🎉
          </p>
        </div>
      </div>

      {/* 💌 Email Subscription */}
      <div className="container my-5">
        <div className="card shadow-sm p-4">
          <h5 className="text-center mb-3 text-primary">📬 Get Latest Updates</h5>
          {subscribed ? (
            <div className="alert alert-success text-center mb-0">
              ✅ Subscribed! We'll keep you posted.
            </div>
          ) : (
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleSubscribe}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Subscribe'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3">
        &copy; {new Date().getFullYear()} Note Keeper. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
