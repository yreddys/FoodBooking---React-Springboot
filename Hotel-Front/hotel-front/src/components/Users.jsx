import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUserRole } from './api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [roleUpdates, setRoleUpdates] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const rolesRaw = localStorage.getItem('roles');
    const storedRoles = rolesRaw ? JSON.parse(rolesRaw) : [];

    const hasAdminRole = storedRoles?.includes('ROLE_ADMIN');
    setRole(hasAdminRole ? 'ADMIN' : 'USER');

    if (hasAdminRole) {
      getAllUsers(storedToken)
        .then(res => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching users:', err);
          setError('Failed to fetch users');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setRoleUpdates(prev => ({ ...prev, [userId]: newRole }));
  };

  const handleUpdateClick = async (userId) => {
    const newRole = roleUpdates[userId];
    if (!newRole) return;

    const token = localStorage.getItem('token');
    try {
      await updateUserRole(userId, newRole, token);
      alert('Role updated successfully');
      const refreshed = await getAllUsers(token);
      setUsers(refreshed.data);
    } catch (err) {
      console.error('Error updating role:', err);
      alert('Failed to update role');
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;

  if (role !== 'ADMIN') {
    return (
      <div className="alert alert-danger text-center mt-4">
        <h4>Access Denied</h4>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-warning text-center mt-4">
        <h4>Error</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">All Users</h2>
      {users.length === 0 ? (
        <p className="text-center">No users found.</p>
      ) : (
        <div className="row">
          {users.map((user, idx) => (
            <div key={idx} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">ID: {user.userId}</h5>
                  <p className="card-text"><strong>Email:</strong> {user.userName}</p>
                  <p className="card-text"><strong>Role:</strong> {user.role?.[0]?.roleName || 'N/A'}</p>

                  <div className="d-flex gap-2 align-items-center mt-3">
                    <select
                      value={roleUpdates[user.userId] || user.role?.[0]?.roleName || ''}
                      onChange={(e) => handleRoleChange(user.userId, e.target.value)}
                      className="form-select form-select-sm"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="USER">USER</option>
                    </select>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleUpdateClick(user.userId)}
                    >
                      Update Role
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
