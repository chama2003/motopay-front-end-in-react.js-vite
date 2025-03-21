import axios from "axios";

const API_URL = "http://localhost:8081/api/customer";  // Change to your backend URL

const createCustomer = async (customer) => {
  try {
    const response = await axios.post(API_URL, customer);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

const getCustomerByUsername = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
};

const updateCustomerByUsername = async (username, updatedCustomer) => {
  try {
    const response = await axios.put(`${API_URL}/${username}`, updatedCustomer);
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

const deleteCustomerByUsername = async (username) => {
  try {
    const response = await axios.delete(`${API_URL}/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};

export default {
  createCustomer,
  getCustomerByUsername,
  updateCustomerByUsername,
  deleteCustomerByUsername
};
