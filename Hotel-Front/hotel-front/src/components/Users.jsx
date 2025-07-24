import React, { useEffect, useState } from 'react';
import { getAllUsers } from './api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('[Users Component] useEffect triggered');

    const storedToken = localStorage.getItem('token');
    const rolesRaw = localStorage.getItem('roles');
    let storedRoles = [];

    try {
      storedRoles = rolesRaw ? JSON.parse(rolesRaw) : [];
    } catch (err) {
      console.error('[Users Component] Failed to parse roles from localStorage:', err);
      storedRoles = [];
    }

    console.log('[Users Component] Retrieved token:', storedToken);
    console.log('[Users Component] Retrieved roles:', storedRoles);

    const hasAdminRole = storedRoles?.includes('ROLE_ADMIN');
    setRole(hasAdminRole ? 'ADMIN' : 'USER');

    if (hasAdminRole) {
      console.log('[Users Component] User is ADMIN, fetching users...');
      getAllUsers(storedToken)
        .then(res => {
          console.log('[Users Component] Users fetched successfully:', res.data);
          setUsers(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('[Users Component] Error fetching users:', err);
          setError('Failed to fetch users');
          setLoading(false);
        });
    } else {
      console.warn('[Users Component] Access Denied - Not an ADMIN');
      setLoading(false);
    }
  }, []);

  if (loading) {
    console.log('[Users Component] Loading...');
    return (
      <div className="p-4">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (role !== 'ADMIN') {
    console.log('[Users Component] Rendering Access Denied');
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
        <p className="mt-2">You do not have permission to check this.</p>
      </div>
    );
  }

  if (error) {
    console.error('[Users Component] Rendering error:', error);
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-red-600">Error</h2>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  console.log('[Users Component] Rendering user list:', users);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user, idx) => (
          <div key={idx} className="border p-2 mb-2 rounded">
            <p><strong>ID:</strong> {user.userId}</p>
            <p><strong>Email:</strong> {user.userName}</p>
            <p><strong>Role:</strong> {user.role?.[0]?.roleName || 'N/A'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Users;
