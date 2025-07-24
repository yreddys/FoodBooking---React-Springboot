import React, { useState } from 'react';
import { register } from './api';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUp = () => {
  const [form, setForm] = useState({ userName: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // 👁️ state
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Signup successful. Please log in.');
      navigate('/login');
    } catch (err) {
      alert('Signup failed.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center text-success mb-2">Sign Up</h3>
        <p className="text-center text-muted mb-4">Create a free account to get started</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
            <FaUser className="position-absolute top-50 translate-middle-y ms-2 text-muted" />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Username"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <FaLock className="position-absolute top-50 translate-middle-y ms-2 text-muted" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control ps-5 pe-5"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="btn btn-success w-100 fw-semibold shadow-sm">
            Create Account
          </button>
        </form>

        <p className="text-center mt-3 text-muted small">
          Already have an account?{' '}
          <a href="/login" className="text-success fw-semibold text-decoration-none">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
