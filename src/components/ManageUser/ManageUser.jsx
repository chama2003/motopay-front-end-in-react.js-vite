import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    role: 'normal-user'
  });

  useEffect(() => {
    // Fetch users on load
    axios.get('http://localhost:8081/api/user')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditMode(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Sending a PUT request to update user data
    axios.put(`http://localhost:8081/api/user/${selectedUser.username}`, selectedUser)
      .then(response => {
        // Update the users list with the updated user
        const updatedUsers = users.map(user =>
          user.username === selectedUser.username ? response.data : user
        );
        setUsers(updatedUsers);
        setEditMode(false); // Exit edit mode
        setSelectedUser(null); // Clear selected user
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleDelete = (username) => {
    // Sending a DELETE request to delete a user
    axios.delete(`http://localhost:8081/api/user/${username}`)
      .then(() => {
        // Remove the deleted user from the list
        setUsers(users.filter(user => user.username !== username));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/api/user', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ username: '', password: '', role: 'normal-user' });
      })
      .catch(error => console.error('Error adding user:', error));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {/* Add new user form */}
      <div className="mb-6 p-4 border border-gray-300 rounded bg-white">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleAddUser}>
          <div className="mb-4">
            <label className="w-full p-2 mb-4 rounded-md text-black">Username</label>
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label className="w-full p-2 mb-4 rounded-md text-black">Password</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label className="w-full p-2 mb-4 rounded-md text-black">Role</label>
            <select
              name="role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
            >
              <option value="normal-user">Normal User</option>
              
            </select>
          </div>
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded mr-2">Add User</button>
        </form>
      </div>

      {/* Table of users */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300">Username</th>
            <th className="px-4 py-2 border border-gray-300">Role</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td className="px-4 py-2 border border-gray-300">{user.username}</td>
              <td className="px-4 py-2 border border-gray-300">{user.role}</td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.username)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit user form */}
      {editMode && (
        <div className="mt-8 p-4 border border-gray-300 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Edit User</h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="w-full p-2 mb-4 rounded-md text-black">Username</label>
              <input
                type="text"
                name="username"
                value={selectedUser.username}
                disabled
                className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
              />
            </div>
            <div className="mb-4">
              <label className="w-full p-2 mb-4 rounded-md text-black">Password</label>
              <input
                type="password"
                name="password"
                value={selectedUser.password}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
              />
            </div>
            <div className="mb-4">
              <label className="w-full p-2 mb-4 rounded-md text-black">User Username</label>
              <input
                type="text"
                name="user_username"
                value={selectedUser.user_username}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
              />
            </div>
            <div className="mb-4">
              <label className="w-full p-2 mb-4 rounded-md text-black">Role</label>
              <input
                type="text"
                name="role"
                value={selectedUser.role}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded mr-2"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
