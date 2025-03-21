const API_URL = "http://localhost:8081/api/payment";  // Change this to your backend URL

// Create Payment
const createPayment = async (payment) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payment),
    });

    const data = await response.json();  // Ensure that we parse the response body

    if (!response.ok) {
      console.error("Payment creation failed:", data);  // Log failure response
      throw new Error(data.message || "Error creating payment");
    }

    return data;  // Return the successful response
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};


export default {
  createPayment,
};
