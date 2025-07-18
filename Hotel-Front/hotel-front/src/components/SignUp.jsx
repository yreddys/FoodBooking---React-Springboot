import React, { useState } from 'react';
import { register } from './api';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [form, setForm] = useState({ userName: '', password: '', role: 'USER' });
  const navigate = useNavigate();

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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={form.userName}
        onChange={(e) => setForm({ ...form, userName: e.target.value })}
        className="w-full border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full border p-2"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Sign Up</button>
    </form>
  );
};

export default SignUp;
