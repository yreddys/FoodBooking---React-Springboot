import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE,
});

export const register = (user) => api.post('/auth/signup', user);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getAllUsers = (token) =>
  api.get('/auth/all', { headers: { Authorization: `Bearer ${token}` } });

export const saveNote = (note, token) =>
  api.post('/notes/save', note, { headers: { Authorization: `Bearer ${token}` } });

export const getMyNotes = (token) =>
  api.get('/notes/my-notes', { headers: { Authorization: `Bearer ${token}` } });
export const updateUserRole = (userId, role, token) =>
  api.put(
    `/auth/update-role/${userId}`,
    { role },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  // ✅ NEW: Update a note by ID
export const updateNote = (id, updatedNote, token) =>
  api.put(`/notes/update/${id}`, updatedNote, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ✅ NEW: Delete a note by ID
export const deleteNote = (id, token) =>
  api.delete(`/notes/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // ✅ New: Get Profile Info
export const getProfile = (token) =>
  api.get('/auth/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const verifyOtp = (otp) =>
  api.post('/auth/verify-otp', { otp });
  export const forgotPassword = (email) =>
  api.post('/auth/forgot-password', { email });

export const resetPassword = (otp, newPassword) =>
  api.post('/auth/reset-password', { otp, newPassword });
export default api;