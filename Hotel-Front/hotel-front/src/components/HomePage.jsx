// src/components/HomePage.jsx
import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div>
     

      {/* Card Area */}
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
{/* Developer Message Section */}
<div className="container mt-5 text-center">
  <div className="alert alert-info shadow-sm">
    <h5 className="mb-2">🚀 Developers are working on more features!</h5>
    <p className="mb-0">
      Stay tuned for more exciting updates. <br />
      <strong>Cheers! – Yarraneella</strong> 🎉
    </p>
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
