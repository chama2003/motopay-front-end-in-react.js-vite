import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // Use useParams to get URL parameters
import paymentService from "./PaymentService"; // Assuming you have a service to handle API calls
import installmentService from "./installmentService";

const AddPayment = () => {
  const { customerUsername } = useParams();  // Extract customerUsername from the URL
  const [paymentPlan, setPaymentPlan] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [numberOfInstallments, setNumberOfInstallments] = useState("");

  const [payments, setPayments] = useState([]);
  const [installments, setInstallments] = useState([]);  // Initialize as an array
  const [message, setMessage] = useState("");
  const [payment, setPaymentId] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
 

  const handleSubmit1 = async (event) => {
    event.preventDefault();

    const installmentData = {
        paymentAmount: amount,
        paymentDate: dueDate,
        paymentId: payment, // Associate the installment with a specific payment
     // Include adminId to associate the installment with an admin
    };

    try {
      const response = await installmentService.createInstallment(installmentData);

      if (response && response.status === 201) {
        setMessage("Installment created successfully!");
        setAmount("");
        setDueDate("");
      } else {
        setMessage(response.message || "Installment creation done ");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };
  // Fetch payments for the customer when the component mounts
  useEffect(() => {
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

  // Fetch installments for the selected payment
  useEffect(() => {
    if (!payment) return; // Do not fetch if no payment is selected

    const fetchInstallments = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/installment/payment/${payment}`);
        if (response.ok) {
          const data = await response.json();
          setInstallments(data);  // Set installments to the fetched data
        } else {
          setMessage("No installments found for this payment.");
        }
      } catch (error) {
        setMessage("Error fetching installments.");
      }
    };

    fetchInstallments();
  }, [payment]); // Re-run when payment changes

  const handleSubmit = async (event) => {
    event.preventDefault();

    const paymentData = {
      paymentPlan: paymentPlan,
      amountPaid: amountPaid,
      totalAmount: totalAmount,
      startDate: startDate,
      interestRate: interestRate,
      numberOfInstallments: numberOfInstallments,
      customerUsername: customerUsername,  // Use the customer username from the URL
    };

    try {
      const response = await paymentService.createPayment(paymentData);
      
      if (response && response.status === 201) {
        setMessage("Payment created successfully!");
        setPaymentPlan("");
        setAmountPaid("");
        setTotalAmount("");
        setStartDate("");
        setInterestRate("");
        setNumberOfInstallments("");
      } else {
        setMessage(response.message || "Payment creation done.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handlePaymentClick = (id) => {
    setPaymentId(id);
    console.log("Selected Payment ID:", id);  // Optional: log the selected payment ID
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-yellow-500 mb-8">Add Payment</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-yellow-500 text-center mb-4">Payment Details</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div>
            <label htmlFor="paymentPlan" className="block text-sm font-medium text-white">
              Payment Plan
            </label>
            <input
              type="text"
              id="paymentPlan"
              name="paymentPlan"
              value={paymentPlan}
              onChange={(e) => setPaymentPlan(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="amountPaid" className="block text-sm font-medium text-white">
              Amount Paid
            </label>
            <input
              type="number"
              id="amountPaid"
              name="amountPaid"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="totalAmount" className="block text-sm font-medium text-white">
              Total Amount
            </label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-white">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="interestRate" className="block text-sm font-medium text-white">
              Interest Rate (%)
            </label>
            <input
              type="number"
              id="interestRate"
              name="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="numberOfInstallments" className="block text-sm font-medium text-white">
              Number of Installments
            </label>
            <input
              type="number"
              id="numberOfInstallments"
              name="numberOfInstallments"
              value={numberOfInstallments}
              onChange={(e) => setNumberOfInstallments(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-600 transition"
          >
            Create Payment
          </button>
        </form>

        {message && <p className="text-center text-yellow-500 mt-4">{message}</p>}
      </div>

      <h1 className="text-4xl font-bold text-center mb-8">Payments for {customerUsername}</h1>

      {message && <p className="text-center text-yellow-500 mt-4">{message}</p>}

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-yellow-500 text-center mb-4">Payment History</h2>
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
                <tr key={index} onClick={() => handlePaymentClick(payment.id)}>
                  <td className="border px-4 py-2">{payment.paymentPlan}</td>
                  <td className="border px-4 py-2">{payment.amountPaid}</td>
                  <td className="border px-4 py-2">{payment.totalAmount}</td>
                  <td className="border px-4 py-2">{payment.startDate}</td>
                  <td className="border px-4 py-2">{payment.interestRate}</td>
                  <td className="border px-4 py-2">
                    {installments.length > 0 ? installments.length : 0} Installments
                  </td>
                  <td className="border px-4 py-2">{payment.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-yellow-500 mt-4">No payments available for this customer.</p>
        )}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-yellow-500 text-center mb-4">Installment History</h2>
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
          <p className="text-center text-yellow-500 mt-4">No installments available for this payment.</p>
        )}
      </div>





      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-semibold text-yellow-500 text-center mb-4">Create Installment</h2>
      <form className="space-y-4" onSubmit={handleSubmit1}>
        {/* Form Fields */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-white">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-white">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-600 transition"
        >
          Create Installment
        </button>
      </form>

      {message && <p className="text-center text-yellow-500 mt-4">{message}</p>}
    </div>

    </div>
  );
};

export default AddPayment;
