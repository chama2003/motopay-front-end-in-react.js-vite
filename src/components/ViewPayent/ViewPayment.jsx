import React, { useState, useEffect } from "react";
import axios from "axios";

const StaffPaymentView = () => {
  const [payments, setPayments] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch all payments when the component mounts
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/payment");
        setPayments(response.data);
      } catch (error) {
        setMessage("Error fetching payments.");
        console.error(error);
      }
    };

    fetchPayments();
  }, []);

  // Fetch installments for the selected payment
  const handlePaymentClick = async (paymentId) => {
    setSelectedPaymentId(paymentId);
    try {
      const response = await axios.get(
        `http://localhost:8081/api/installment/payment/${paymentId}`
      );
      setInstallments(response.data);
    } catch (error) {
      setMessage("Error fetching installments.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-yellow-500 mb-8">
        Staff Payment Management
      </h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-yellow-500 text-center mb-4">
          All Payments
        </h2>
        {message && <p className="text-center text-yellow-500 mt-4">{message}</p>}

        {payments.length > 0 ? (
          <table className="min-w-full text-center table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Payment Plan</th>
                <th className="px-4 py-2">Amount Paid</th>
                <th className="px-4 py-2">Total Amount</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">Installments</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} onClick={() => handlePaymentClick(payment.id)}>
                  <td className="border px-4 py-2">{payment.paymentPlan}</td>
                  <td className="border px-4 py-2">{payment.amountPaid}</td>
                  <td className="border px-4 py-2">{payment.totalAmount}</td>
                  <td className="border px-4 py-2">{payment.startDate}</td>
                  <td className="border px-4 py-2">
                    {installments.length > 0 ? installments.length : 0} Installments
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-yellow-500 mt-4">No payments available.</p>
        )}
      </div>

      {selectedPaymentId && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-yellow-500 text-center mb-4">
            Installment History for Payment ID: {selectedPaymentId}
          </h2>
          {installments.length > 0 ? (
            <table className="min-w-full text-center table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Due Date</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {installments.map((installment, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{installment.paymentAmount}</td>
                    <td className="border px-4 py-2">{installment.paymentDate}</td>
                    <td className="border px-4 py-2">{installment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-yellow-500 mt-4">
              No installments available for this payment.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default StaffPaymentView;
