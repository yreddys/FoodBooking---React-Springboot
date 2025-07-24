import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [form, setForm] = useState({ userName: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // 👁️ visibility toggle
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const { token, roles } = res.data;

      localStorage.setItem('token', token);
      if (roles && Array.isArray(roles)) {
        localStorage.setItem('roles', JSON.stringify(roles));
      }

      navigate('/');
    } catch (err) {
      alert('Login failed. Please check credentials.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center text-primary mb-3">Login</h3>
        <p className="text-center text-muted">Enter your credentials to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
              required
            />
          </div>

          <div className="mb-4 position-relative">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="form-control pe-5"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="btn btn-primary w-100">
  Login
</button>

<p className="text-center mt-2">
  <a href="/forgot-password" className="text-primary text-decoration-none">
    Forgot Password?
  </a>
</p>

        </form>

        <p className="mt-3 text-center text-muted small">
          Your credentials are safe and secure.
        </p>
      </div>
    </div>
  );
};

export default Login;
