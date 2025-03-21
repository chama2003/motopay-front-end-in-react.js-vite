import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeasingConfirmation = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [leasingAmount, setLeasingAmount] = useState('');
  const [error, setError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(null); // For tracking confirmation status
  const [isRejected, setIsRejected] = useState(null); // For tracking rejection status

  // Get logged-in user's userId from localStorage
  const loggedUserId = localStorage.getItem('userId');

  // Fetch applications data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/application');
        // Filter applications to show only those belonging to the logged-in user
        const filteredApplications = response.data.filter(application => application.userId === loggedUserId);
        setApplications(filteredApplications);
      } catch (error) {
        setError('Failed to fetch applications.');
      }
    };
    fetchData();
  }, [loggedUserId]);

  // Handle viewing the details of a selected application
  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setLeasingAmount(application.expectedLeasingAmount);
  };

  // Handle confirming the application
  const handleConfirm = async () => {
    console.log('Confirming application for NIC:', selectedApplication.nic);
    if (selectedApplication && leasingAmount) {
      try {
        // Send the request to update the customer status to "approved"
        const response = await axios.put(
          `http://localhost:8081/api/application/${selectedApplication.nic}/customer-status?status=approved`
        );

        if (response.status === 200) {
          // Update the application list and mark the application as confirmed
          setApplications(prevApplications =>
            prevApplications.map(application =>
              application.nic === selectedApplication.nic
                ? { ...application, customerStatus: 'approved' }
                : application
            )
          );
          setIsConfirmed(true);
          setSelectedApplication(null);
        } else {
          setError('Failed to update application status');
        }
      } catch (error) {
        console.error('Error updating customer status:', error);
        setError('Failed to update application status');
      }
    } else {
      setError('Please enter a valid leasing amount');
    }
  };

  // Handle rejecting the application
  const handleReject = async () => {
    if (selectedApplication) {
      try {
        // Send the request to update the customer status to "rejected"
        const response = await axios.put(
          `http://localhost:8081/api/application/${selectedApplication.nic}/customer-status?status=rejected`
        );

        if (response.status === 200) {
          // Update the application list and mark the application as rejected
          setApplications(prevApplications =>
            prevApplications.map(application =>
              application.nic === selectedApplication.nic
                ? { ...application, customerStatus: 'rejected' }
                : application
            )
          );
          setIsRejected(true);
          setSelectedApplication(null);
        } else {
          setError('Failed to update application status');
        }
      } catch (error) {
        console.error('Error updating customer status:', error);
        setError('Failed to update application status');
      }
    }
  };


  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center"></h1>

      {/* Submitted Online Applications Section */}
      <div className="bg-black p-6 rounded-lg shadow-lg mb-6">
  <h2 className="text-2xl font-semibold mb-4 text-white">Submitted Online Applications</h2>
  <ul>
    {applications.map((application) => (
      application.staffEstimatedAmount !== 0 && application.customerStatus!=='approved'&& (
        <li key={application.nic} className="mb-2 p-3 border rounded-md bg-gray-800 text-white">
          <p><strong>NIC:</strong> {application.nic}</p>
          <p><strong>Full Name:</strong> {application.fullname}</p>
          <p><strong>Expected Leasing Amount:</strong> Rs{application.expectedLeasingAmount}</p>
          <button
            onClick={() => handleViewDetails(application)}
            className="mt-2 py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            View Details
          </button>
        </li>
      )
    ))}
  </ul>
</div>


      {selectedApplication && (
        <div className="mt-6 bg-gray-900 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-xl font-semibold mb-4">Application Details</h3>

          {/* Application Fields */}
          <p><strong>NIC:</strong> {selectedApplication.nic}</p>
          <p><strong>Full Name:</strong> {selectedApplication.fullname}</p>
          <p><strong>Address:</strong> {selectedApplication.address}</p>
          <p><strong>Monthly Income:</strong> {selectedApplication.monthlyIncome}</p>
          <p><strong>Asset Ownership:</strong> {selectedApplication.assetOwnership}</p>
          <p><strong>Asset Estimate Value:</strong> {selectedApplication.assetEstimateValue}</p>
          <p><strong>Business Income:</strong> {selectedApplication.businessIncome}</p>
          <p><strong>Other Income:</strong> {selectedApplication.otherIncome}</p>
          <p><strong>Email:</strong> {selectedApplication.email}</p>
          <p><strong>Date of Birth:</strong> {selectedApplication.dateOfBirth}</p>
          <p><strong>Profession:</strong> {selectedApplication.professions}</p>
          <p><strong>Mobile Phone:</strong> {selectedApplication.mobilePhoneNumber}</p>
          <p><strong>Company Mobile:</strong> {selectedApplication.companyMobileNo}</p>
          <p><strong>Residence Phone:</strong> {selectedApplication.residencePhoneNumber}</p>
          <p><strong>Nationality:</strong> {selectedApplication.nationality}</p>
          <p><strong>Guarantor NIC:</strong> {selectedApplication.guarantorNic}</p>
          <p><strong>Vehicle Registration No:</strong> {selectedApplication.vehicleRegistrationNo}</p>
          <p><strong>Account No:</strong> {selectedApplication.accountNo}</p>
          <p><strong>Name of Employee:</strong> {selectedApplication.nameOfEmployee}</p>
          <p><strong>Designation:</strong> {selectedApplication.designation}</p>
          <p><strong>Admin Status:</strong> {selectedApplication.adminStatus}</p>
          <p><strong>Customer Status:</strong> {selectedApplication.customerStatus}</p>
          <p><strong>Expected Leasing Amount:</strong> {selectedApplication.expectedLeasingAmount}</p>
          <p><strong>Staff Estimated Amount:</strong> {selectedApplication.staffEstimatedAmount}</p>

          {/* Confirmation Buttons */}
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-4 text-center">
              Do you want to proceed with this leasing amount?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirm}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Confirm
              </button>
              <button
                onClick={handleReject}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Reject
              </button>
            </div>
          </div>

          {/* Confirmation Status Message */}
          {isConfirmed === true && (
            <div className="mt-4 p-4 bg-green-800 border border-green-600 rounded-lg text-green-300 text-center">
              <p>✅ Leasing amount has been confirmed.</p>
            </div>
          )}
          {isRejected === true && (
            <div className="mt-4 p-4 bg-red-800 border border-red-600 rounded-lg text-red-300 text-center">
              <p>❌ Leasing amount has been rejected.</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-800 border border-red-600 rounded-lg text-red-300 text-center">
          <p>{error}</p>
        </div>
      )}
      <br/>
      <br/>
      <br/>
      <br/><br/><br/>
    </div>
  );
};

export default LeasingConfirmation;
