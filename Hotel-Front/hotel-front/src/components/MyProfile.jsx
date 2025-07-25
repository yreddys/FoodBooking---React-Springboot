import React, { useEffect, useState } from 'react';
import { getProfile } from './api';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((res) => {
          console.log('📄 Profile fetched:', res.data);
          setProfile(res.data);
        })
        .catch(() => alert('❌ Failed to load profile'));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('user'); // Optional if you're using it
    navigate('/login');
  };

  if (!profile) {
    return (
      <div className="container py-5">
        <div className="alert alert-info text-center">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-body">
              <h3 className="card-title text-primary mb-4 text-center">👤 My Profile</h3>
              <p><strong>Username:</strong> {profile.userName}</p>
              <p><strong>Roles:</strong> {profile.roles.join(', ')}</p>
              <p><strong>Premium Status:</strong> {profile.premium ? '✅ Yes' : '❌ No'}</p>

              <div className="text-center mt-4">
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  🔓 Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
