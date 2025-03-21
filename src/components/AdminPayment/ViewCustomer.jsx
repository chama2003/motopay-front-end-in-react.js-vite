import React, { useState } from "react";

const ViewCustomer = () => {
  const [username, setUsername] = useState("");
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setCustomer(null);

    try {
      const response = await fetch(`http://localhost:8081/api/customer/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCustomer(data);
      } else {
        setError("Customer not found.");
      }
    } catch (error) {
      setError("Error fetching customer data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-yellow-500 mb-8">View Customer</h1>

      {/* Customer Search Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-yellow-500 text-center mb-4">Search Customer by Username</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              required
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-600 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && <p className="text-center text-yellow-500">Loading...</p>}

      {/* Error Message */}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Customer Data Display */}
      {customer && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
          <h3 className="text-2xl font-semibold text-yellow-500 text-center mb-4">Customer Details</h3>
          <p><strong>Username:</strong> {customer.username}</p>
          <p><strong>User Username:</strong> {customer.user_username}</p>
          {/* Add any other details you want to display */}
        </div>
      )}
    </div>
  );
};

export default ViewCustomer;
