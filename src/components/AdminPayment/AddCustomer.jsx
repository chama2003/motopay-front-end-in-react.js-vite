import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // To get `user_username` from the URL params
import customerService from "./CustomerService";  // Assuming you have a customer service for API calls

const AddCustomer = () => {
  const { user_username } = useParams();  // Fetch `user_username` from URL params

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle form submission for account creation
  const handleCreateAccountSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const newCustomer = {
      username,
      password,
      user_username: user_username,
      role: "customer", // Automatically set the role as 'customer'
    };

    try {
      // Send a POST request to create a new customer account
      const response = await fetch("http://localhost:8081/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });

      // Handle the response
      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully!");
        navigate(`/AddPayment/${username}`);  // Redirect to the payment page
      } else {
        setMessage(data.message || "Account creation failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-yellow-500 mb-8">
        Admin Payment Schedule
      </h1>

      {/* Create Account Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-yellow-500 text-center mb-4">
          Create Account
        </h2>
        <form className="space-y-4" onSubmit={handleCreateAccountSubmit}>
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
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-600 transition"
          >
            Create Account
          </button>
        </form>
        {message && <p className="text-center text-yellow-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default AddCustomer;
