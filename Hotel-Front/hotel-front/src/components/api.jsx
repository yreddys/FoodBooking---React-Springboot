import axios from 'axios';

  const API_BASE = 'http://localhost:8080/api';
// const API_BASE = 'http://hotel4-env.eba-erqr2quj.ap-south-1.elasticbeanstalk.com/api';

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

export const createOrder = (token) =>
  api.post('/payment/create-order', {}, {
    headers: { Authorization: `Bearer ${token}` },
  });


export const confirmPayment = (paymentConfirmation, token) =>
  api.post('/payment/confirm', paymentConfirmation, {
    headers: { Authorization: `Bearer ${token}` },
  });
// Search notes by title
export const searchNotesByTitle = (title, token) => {
  return axios.get(`/api/notes/search`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      title: title,
    },
  });
};
// ✅ Send OTP to email for subscription
export const sendSubscriptionOtp = (email) => {
  return axios.post(`${API_BASE}/subscribe/send-otp`, { email });
};

// ✅ Verify OTP and subscribe the user
export const verifySubscriptionOtp = (otp) => {
  return axios.post(`${API_BASE}/subscribe/verify`, { otp });
};
// ✅ Publish update (ADMIN only)
export const publishUpdate = (updatePost, token) =>
  axios.post(`${API_BASE}/admin/updates/publish`, updatePost, {
    headers: { Authorization: `Bearer ${token}` },
  });
  export const uploadUsersFromExcel = (file, token) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post('/user-management/upload-users', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const changePassword = (data) =>
  api.post('/user-management/change-password', data);

  // ✅ Send interest emails (ADMIN only)
export const sendInterestEmails = (token) =>
  api.post('/interests/send-interest-emails', {}, {
    headers: { Authorization: `Bearer ${token}` },
  });


export default api;