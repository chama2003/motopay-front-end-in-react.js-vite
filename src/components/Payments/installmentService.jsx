import axios from 'axios';

const API_URL = 'http://localhost:8081/api/installment';

const createInstallment = async (installmentData) => {
  try {
    const response = await axios.post(API_URL, installmentData);
    return response;
  } catch (error) {
    throw error;
  }
};

export default { createInstallment };
