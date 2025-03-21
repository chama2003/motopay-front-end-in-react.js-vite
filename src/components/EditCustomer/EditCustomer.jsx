import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [staffId, setStaffId] = useState('');
  const [staffDetails, setStaffDetails] = useState(null);
  const [error, setError] = useState('');
  const [newStaffDetails, setNewStaffDetails] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    username: '',
    password: ''
  });
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [confirmedApplications, setConfirmedApplications] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [customerDetails, setCustomerDetails] = useState(null);
  const [customerError, setCustomerError] = useState('');
  const [paymentCustomerId, setPaymentCustomerId] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentError, setPaymentError] = useState('');
  const [isEditingStaff, setIsEditingStaff] = useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false); // New state for editing customer
  const navigate = useNavigate();

  // Simulate fetching confirmed applications from an API
  useEffect(() => {
    const fetchConfirmedApplications = async () => {
      // Simulated data; replace with actual API call
      const fetchedConfirmedApplications = [
        { id: 1, customerName: 'Alice Johnson', leasingAmount: 5000, leasingPeriod: 12 },
        { id: 2, customerName: 'Bob Smith', leasingAmount: 7500, leasingPeriod: 24 },
        { id: 3, customerName: 'Carol White', leasingAmount: 10000, leasingPeriod: 36 },
      ];
      setConfirmedApplications(fetchedConfirmedApplications);
    };

    fetchConfirmedApplications();
  }, []);

  const handleSearchStaff = () => {
    // Simulated data; replace with actual API call
    const fetchedStaffDetails = {
      id: '54321',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '987-654-3210',
      position: 'Manager',
      username: 'jane.doe',
      password: 'password123'
    };

    if (staffId === fetchedStaffDetails.id) {
      setStaffDetails(fetchedStaffDetails);
      setError('');
    } else {
      setStaffDetails(null);
      setError('Staff member not found');
    }
  };

  const handleEditStaff = () => {
    setIsEditingStaff(true);
  };

  const handleSaveEditStaff = () => {
    // Logic for saving edited staff details
    console.log('Save edited staff details:', staffDetails);
    setIsEditingStaff(false);
  };

  const handleDeleteStaff = () => {
    // Logic for deleting staff member
    console.log('Delete staff member:', staffDetails.id);
    setStaffDetails(null);
    setError('');
  };

  const handleAddStaff = () => {
    // Logic for adding new staff member
    console.log('Add new staff member:', newStaffDetails);
    setShowAddStaffForm(false);
    setNewStaffDetails({
      id: '',
      name: '',
      email: '',
      phone: '',
      position: '',
      username: '',
      password: ''
    });
  };

  const handleSearchCustomer = () => {
    // Simulate fetching customer details from an API
    const fetchedCustomerDetails = {
      id: '12345',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, City, Country',
      leasingAmount: 5000,
      leasingPeriod: 12
    };

    if (customerId === fetchedCustomerDetails.id) {
      setCustomerDetails(fetchedCustomerDetails);
      setCustomerError('');
    } else {
      setCustomerDetails(null);
      setCustomerError('Customer not found');
    }
  };

  const handleEditCustomer = () => {
    setIsEditingCustomer(true); // Enable editing mode
  };

  const handleSaveEditCustomer = () => {
    // Logic for saving edited customer details
    console.log('Save edited customer details:', customerDetails);
    setIsEditingCustomer(false); // Disable editing mode
  };

  const handleDeleteCustomer = () => {
    // Logic for deleting customer details
    console.log('Delete customer:', customerDetails.id);
    setCustomerDetails(null);
    setCustomerError('');
  };

  const handleSearchPayment = () => {
    // Simulate fetching payment details from an API
    const fetchedPaymentDetails = {
      id: '12345',
      payments: [
        { date: '2025-01-01', amount: 100, status: 'Paid' },
        { date: '2025-02-01', amount: 100, status: 'Paid' },
        { date: '2025-03-01', amount: 100, status: 'Pending' },
      ],
    };

    if (paymentCustomerId === fetchedPaymentDetails.id) {
      setPaymentDetails(fetchedPaymentDetails);
      setPaymentError('');
    } else {
      setPaymentDetails(null);
      setPaymentError('Payment details not found');
    }
  };

  const handleEditPayment = () => {
    // Logic for editing payment details
    console.log('Edit payment details:', paymentDetails);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      
     

      {/* Search Customer Details Section */}
      <div className="bg-black p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-white">Search Customer Details</h2>
        <div className="mb-4">
          <label htmlFor="customer-id" className="block text-white text-sm font-bold mb-2">
            Customer ID
          </label>
          <input
            type="text"
            id="customer-id"
            name="customer-id"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearchCustomer}
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </div>

        {customerError && <p className="text-red-500">{customerError}</p>}
        {customerDetails && (
          <div className="mt-4 bg-gray-800 p-4 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
            {isEditingCustomer ? (
              <>
                <div className="mb-4">
                  <label htmlFor="edit-customer-name" className="block text-white text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="edit-customer-name"
                    name="edit-customer-name"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-customer-email" className="block text-white text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="edit-customer-email"
                    name="edit-customer-email"
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-customer-phone" className="block text-white text-sm font-bold mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="edit-customer-phone"
                    name="edit-customer-phone"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-customer-address" className="block text-white text-sm font-bold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="edit-customer-address"
                    name="edit-customer-address"
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-customer-leasingAmount" className="block text-white text-sm font-bold mb-2">
                    Leasing Amount
                  </label>
                  <input
                    type="number"
                    id="edit-customer-leasingAmount"
                    name="edit-customer-leasingAmount"
                    value={customerDetails.leasingAmount}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, leasingAmount: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-customer-leasingPeriod" className="block text-white text-sm font-bold mb-2">
                    Leasing Period (months)
                  </label>
                  <input
                    type="number"
                    id="edit-customer-leasingPeriod"
                    name="edit-customer-leasingPeriod"
                    value={customerDetails.leasingPeriod}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, leasingPeriod: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleSaveEditCustomer}
                  className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingCustomer(false)}
                  className="ml-4 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-300"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p><strong>ID:</strong> {customerDetails.id}</p>
                <p><strong>Name:</strong> {customerDetails.name}</p>
                <p><strong>Email:</strong> {customerDetails.email}</p>
                <p><strong>Phone:</strong> {customerDetails.phone}</p>
                <p><strong>Address:</strong> {customerDetails.address}</p>
                <p><strong>Leasing Amount:</strong> ${customerDetails.leasingAmount}</p>
                <p><strong>Leasing Period:</strong> {customerDetails.leasingPeriod} months</p>
                <div className="mt-4">
                  <button
                    onClick={handleEditCustomer}
                    className="mr-4 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteCustomer}
                    className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Admin;