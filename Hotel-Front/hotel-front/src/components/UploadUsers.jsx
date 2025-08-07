// src/components/UploadUsers.jsx
import React, { useState } from 'react';
import { uploadUsersFromExcel } from './api';
import { useNavigate } from 'react-router-dom';

const UploadUsers = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const token = localStorage.getItem('token');

    if (!file) {
      alert('Please select a file');
      return;
    }

    try {
      const res = await uploadUsersFromExcel(file, token);
      alert(res.data || 'Users uploaded successfully');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Users (Excel)</h2>
      <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" className="form-control mt-3" />
      <button className="btn btn-primary mt-3" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default UploadUsers;
