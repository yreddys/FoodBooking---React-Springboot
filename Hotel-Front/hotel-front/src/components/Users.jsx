import React, { useEffect, useState } from 'react';
import { getAllUsers } from './api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);

    if (storedRole === 'ADMIN') {
      const token = localStorage.getItem('token');
      getAllUsers(token)
        .then(res => setUsers(res.data))
        .catch(() => alert('Failed to fetch users'));
    }
  }, []);

  if (role !== 'ADMIN') {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
        <p className="mt-2">You do not have permission to check this.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      {users.map((user, idx) => (
        <div key={idx} className="border p-2 mb-2 rounded">
          <p><strong>ID:</strong> {user.userId}</p>
          <p><strong>Email:</strong> {user.userName}</p>
          <p><strong>Role:</strong> {user.role[0].roleName}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
