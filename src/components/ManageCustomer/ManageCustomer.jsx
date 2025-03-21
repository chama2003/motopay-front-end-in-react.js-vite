import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch customers on load
    axios.get('http://localhost:8081/api/customer')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setEditMode(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Sending a PUT request to update customer data
    axios.put(`http://localhost:8081/api/customer/${selectedCustomer.username}`, selectedCustomer)
      .then(response => {
        // Update the customers list with the updated customer
        const updatedCustomers = customers.map(customer =>
          customer.username === selectedCustomer.username ? response.data : customer
        );
        setCustomers(updatedCustomers);
        setEditMode(false); // Exit edit mode
        setSelectedCustomer(null); // Clear selected customer
      })
      .catch(error => console.error('Error updating customer:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer({ ...selectedCustomer, [name]: value });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Customers</h1>

      {/* Table of customers */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300">Username</th>
            <th className="px-4 py-2 border border-gray-300">User Username</th>
            <th className="px-4 py-2 border border-gray-300">Role</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.username}>
              <td className="px-4 py-2 border border-gray-300">{customer.username}</td>
              <td className="px-4 py-2 border border-gray-300">{customer.user_username}</td>
              <td className="px-4 py-2 border border-gray-300">{customer.role}</td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  onClick={() => handleEdit(customer)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit customer form */}
      {editMode && (
        <div className="mt-8 p-4 border border-gray-300 rounded bg-white">
          <h2 className="text-xl font-semibold mb-4">Edit Customer</h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="w-full p-2 mb-4   rounded-md text-black">Username</label>
              <input
                type="text"
                name="username"
                value={selectedCustomer.username}
                disabled
                className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
              />
            </div>
            <div className="mb-4">
              <label className="w-full p-2 mb-4   rounded-md text-black">Password</label>
              <input
                type="password"
                name="password"
                value={selectedCustomer.password}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
              />
            </div>
            <div className="mb-4">
              <label className="w-full p-2 mb-4   rounded-md text-black">User Username</label>
              <input
                type="text"
                name="user_username"
                value={selectedCustomer.user_username}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
              />
            </div>
            <div className="mb-4">
              <label className="w-full p-2 mb-4   rounded-md text-black">Role</label>
              <input
                type="text"
                name="role"
                value={selectedCustomer.role}
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

export default CustomerManagement;
