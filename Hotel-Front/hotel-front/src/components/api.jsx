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

export default api;