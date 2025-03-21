import React, { useState, useEffect } from "react";
import paymentService from "./PaymentService"; // Assuming you have a service to handle API calls
import installmentService from "./installmentService"; // Assuming you have a service for installment API

const Payment = () => {
  const storedUserId = localStorage.getItem('userId'); // Get the userId from localStorage
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
  const [paymentAmount, setpaymentAmount] = useState("");
  
  // Fetch payments for the customer when the component mounts
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/payment/customer/${storedUserId}`);
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
  }, [storedUserId]);

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

  const handlePaymentClick = (id) => {
    setPaymentId(id);
    console.log("Selected Payment ID:", id);  // Optional: log the selected payment ID
  };
  const handlepaymentAmountClick = (paymentAmount) => {
    setpaymentAmount(paymentAmount);
    console.log("Selected Payment amount:", updatedAmountPaid);  // Optional: log the selected payment ID
  };
  const handleamountpaidClick = (amountPaid) => {
    setAmountPaid(amountPaid);
    console.log("Selected Payment amount:", amountPaid);  // Optional: log the selected payment ID
  };
  const handleInstallmentClick = (installmentId) => {
    console.log("Selected Installment ID:", installmentId);  // Optional: log the selected installment ID
    // Here you can add logic for handling the installment button click
  };

  const handlepaymentPlanClick = (paymentPlan) => {
    setpaymentPlan(paymentPlan);
    console.log("Selected Payment amount:", paymentPlan);  // Optional: log the selected payment ID
  };
  const handletotalAmountClick = (totalAmount) => {
    settotalAmount(totalAmount);
    console.log("Selected Payment amount:", totalAmount);  // Optional: log the selected payment ID
  };
  const handlestartDateClick = (startDate) => {
    setstartDate(startDate);
    console.log("Selected Payment amount:", startDate);  // Optional: log the selected payment ID
  };
  const handleinterestRateClick = (interestRate) => {
    setinterestRate(interestRate);
    console.log("Selected Payment amount:", interestRate);  // Optional: log the selected payment ID
  };

  const [InterestRate, setinterestRate] = useState([]);
  const [PaymentPlan, setpaymentPlan] = useState([]); 
  const [TotalAmount, settotalAmount] = useState([]);
  const [StartDate, setstartDate] = useState([]);
  

  
  
  

  const updatedAmountPaid = parseFloat(Number(amountPaid) + Number(paymentAmount));

  const updateInstallmentStatus = async (installmentId, paymentId, installmentAmount) => {
    try {
      // Create the updated installment object with status set to 'Paid'
      const updatedInstallment = {
        status: 'Paid',  // Set status to 'Paid'
      };
  
      // Make the PUT request to update the installment with the new status
      const installmentResponse = await fetch(`http://localhost:8081/api/installment/${installmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInstallment), // Send the updated installment as JSON
      });
  
      if (installmentResponse.ok) {
        // If the status is updated successfully, reflect the change locally
        setInstallments((prevInstallments) =>
          prevInstallments.map((installment) =>
            installment.id === installmentId
              ? { ...installment, status: 'Paid' } // Update status to 'Paid'
              : installment
          )
        );
  
        // Now update the corresponding payment's amountPaid
        const paymentResponse = await fetch(`http://localhost:8081/api/payment/${payment}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentPlan:PaymentPlan,
            amountPaid:updatedAmountPaid,  
            totalAmount:TotalAmount,
            startDate:StartDate,
            interestRate:InterestRate,// Add the installment amount to the payment's amountPaid
          }),
        });
  
        if (paymentResponse.ok) {
          // Update the payment amount in state after a successful update
          setMessage("Installment paid and payment updated successfully!");
          // Optionally, you can fetch the updated payments again if needed
        } else {
          setMessage("Error updating payment amount.");
        }
      } else {
        setMessage("Error updating installment status.");
      }
    } catch (error) {
      setMessage("Error updating installment and payment status.");
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Payments for {storedUserId}</h1>

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
    <tr key={index} onClick={() => { handlePaymentClick(payment.id); handleamountpaidClick(payment.amountPaid); handlepaymentPlanClick(payment.paymentPlan); 
      handletotalAmountClick(payment.totalAmount); handlestartDateClick(payment.startDate); 
      handleinterestRateClick(payment.interestRate);
    }}>
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
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {installments.map((installment, index) => (
                <tr key={index} onClick={() => handlepaymentAmountClick(installment.paymentAmount)}>
                  <td className="border px-4 py-2">{installment.paymentAmount}</td>
                  <td className="border px-4 py-2">{installment.paymentDate}</td>
                  <td className="border px-4 py-2">{installment.status}</td>
                  <td className="border px-4 py-2">
                    {installment.status !== 'Paid' && (
                      <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => { updateInstallmentStatus(installment.id); handleamountpaidClick(payment.amountPaid); }}
                      >
                        Pay now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-yellow-500 mt-4">No installments available for this payment.</p>
        )}
      </div>
    </div>
  );
};

export default Payment;
