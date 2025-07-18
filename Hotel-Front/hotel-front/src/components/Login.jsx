import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api';

const Login = () => {
  const [form, setForm] = useState({ userName: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const { token, role } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 space-y-6 bg-white p-6 rounded shadow"
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="username" className="font-semibold text-gray-700">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={form.userName}
          onChange={(e) => setForm({ ...form, userName: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="font-semibold text-gray-700">
          Password 
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
