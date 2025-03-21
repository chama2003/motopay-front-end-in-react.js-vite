import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get customerUsername from the URL

const ViewPayments = () => {
  const { customerUsername } = useParams();  // Extract customerUsername from the URL
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch payments for the customer when the component mounts
    const fetchPayments = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/payment/customer/${customerUsername}`);
        if (response.ok) {
          const data = await response.json();
          setPayments(data);
        } else {
          setMessage("No payments found for this customer.");
        }
      } catch (error) {
        setMessage("Error fetching payments.");
      }
    };

    fetchPayments();
  }, [customerUsername]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-yellow-500 mb-8">Payments for {customerUsername}</h1>
      
      {/* Display message if no payments found */}
      {message && <p className="text-center text-yellow-500 mt-4">{message}</p>}

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-yellow-500 text-center mb-4">Payment History</h2>

        {/* Display the list of payments */}
        {payments.length > 0 ? (
          <table className="min-w-full text-center table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Payment Plan</th>
                <th className="px-4 py-2">Amount Paid</th>
                <th className="px-4 py-2">Total Amount</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">Interest Rate</th>
                <th className="px-4 py-2">Installments</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{payment.paymentPlan}</td>
                  <td className="border px-4 py-2">{payment.amountPaid}</td>
                  <td className="border px-4 py-2">{payment.totalAmount}</td>
                  <td className="border px-4 py-2">{payment.startDate}</td>
                  <td className="border px-4 py-2">{payment.interestRate}</td>
                  <td className="border px-4 py-2">{payment.numberOfInstallments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-yellow-500 mt-4">No payments available for this customer.</p>
        )}
      </div>
    </div>
  );
};

export default ViewPayments;
