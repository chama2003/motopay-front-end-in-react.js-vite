import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [guarantorDetails, setGuarantorDetails] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [leasingAmount, setLeasingAmount] = useState(0);
  const [error, setError] = useState(null);

  const [userUsername, setUserUsername] = useState(''); // State for the user_username

  const loggedInCustomerId = localStorage.getItem('userId'); // Assuming the logged-in customer ID is saved in localStorage

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        // Fetch customer data to get the user_username
        const customerResponse = await axios.get(`http://localhost:8081/api/customer/${loggedInCustomerId}`);
        setUserUsername(customerResponse.data.user_username);  // Assuming the user_username is in the Customer table
      } catch (error) {
        setError('Failed to fetch customer data');
      }
    };

    if (loggedInCustomerId) {
      fetchCustomerData();
  
    } else {
      setError('User not logged in');
    }
  }, [loggedInCustomerId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only fetch applications once we have the user_username
        if (userUsername) {
          const applicationsResponse = await axios.get(`http://localhost:8081/api/application/user/${userUsername}`);
          setApplications(applicationsResponse.data);
          console.log(applicationsResponse.data);
          // Fetch guarantor data
          const guaranteeResponse = await axios.get('http://localhost:8081/api/guarantor');
          setGuarantorDetails(guaranteeResponse.data);

          // Fetch vehicle data
          const vehicleDataResponse = await axios.get('http://localhost:8081/api/vehicle');
          setVehicleDetails(vehicleDataResponse.data);

          // Fetch bank data
          const bankDataResponse = await axios.get('http://localhost:8081/api/bank');
          setBankDetails(bankDataResponse.data);
        }
      } catch (error) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [userUsername]);  // Run when userUsername is updated

  const matchingGuarantor = guarantorDetails.find(
    (guarantor) => guarantor.guarantorNic === selectedApplication?.guarantorNic
  );

  const matchingVehicle = vehicleDetails.find(
    (vehicle) => vehicle.vehicleRegistrationNo === selectedApplication?.vehicleRegistrationNo
  );

  const matchingBank = bankDetails.find(
    (bank) => bank.accountNo === selectedApplication?.accountNo
  );

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setLeasingAmount(application.expectedLeasingAmount);
  };
  const handleDownload = () => {
    if (!selectedApplication) return;
  
    // Define headers for all the fields you want to include
    const headers = [
      'NIC', 'Full Name', 'Username', 'Address', 'Monthly Income', 'Asset Ownership',
      'Asset Estimate Value', 'Business Income', 'Other Income', 'Email', 'Date of Birth',
      'Profession', 'Mobile Phone', 'Company Mobile', 'Residence Phone', 'Nationality',
      'Guarantor NIC', 'Vehicle Registration No', 'Account No', 'Name of Employee',
      'Designation', 'Admin Status', 'Customer Status', 'Expected Leasing Amount',
      'Staff Estimated Amount', 'Expected Leasing Period', 'Staff Estimated Period',
      'Asset Ownership Document', 'Birth Certificate', 'NIC Image', 'Electricity Bill',
      'Guarantor NIC (Details)', 'Guarantor Name', 'Guarantor Occupation', 'Guarantor Income',
      'Bank Account No', 'Bank Account Type', 'Bank Name', 'Bank Branch',
      'Vehicle Registration No (Details)', 'Vehicle Brand', 'Vehicle Model'
    ];
  
    // Define the data to download, including application, guarantor, bank, and vehicle details
    const data = [
      selectedApplication.nic,
      selectedApplication.fullname,
      userUsername,
      selectedApplication.address,
      selectedApplication.monthlyIncome,
      selectedApplication.assetOwnership,
      selectedApplication.assetEstimateValue,
      selectedApplication.businessIncome,
      selectedApplication.otherIncome,
      selectedApplication.email,
      selectedApplication.dateOfBirth,
      selectedApplication.professions,
      selectedApplication.mobilePhoneNumber,
      selectedApplication.companyMobileNo,
      selectedApplication.residencePhoneNumber,
      selectedApplication.nationality,
      selectedApplication.guarantorNic,
      selectedApplication.vehicleRegistrationNo,
      selectedApplication.accountNo,
      selectedApplication.nameOfEmployee,
      selectedApplication.designation,
      selectedApplication.adminStatus,
      selectedApplication.customerStatus,
      selectedApplication.expectedLeasingAmount,
      selectedApplication.staffEstimatedAmount,
      selectedApplication.expectedTimePeriod,
      selectedApplication.staffEstimatedTimePeriod,
      selectedApplication.assetOwnershipDoc ? `<a href="${selectedApplication.assetOwnershipDoc}" target="_blank" rel="noopener noreferrer">View</a>` : 'N/A',
      selectedApplication.birthCertificateImage ? `<a href="${selectedApplication.birthCertificateImage}" target="_blank" rel="noopener noreferrer">View</a>` : 'N/A',
      selectedApplication.nicImage ? `<a href="${selectedApplication.nicImage}" target="_blank" rel="noopener noreferrer">View</a>` : 'N/A',
      selectedApplication.electricityBillImg ? `<a href="${selectedApplication.electricityBillImg}" target="_blank" rel="noopener noreferrer">View</a>` : 'N/A',
      matchingGuarantor ? matchingGuarantor.guarantorNic : 'N/A',
      matchingGuarantor ? matchingGuarantor.guarantorsName : 'N/A',
      matchingGuarantor ? matchingGuarantor.guarantorOccupation : 'N/A',
      matchingGuarantor ? matchingGuarantor.guarantorIncome : 'N/A',
      matchingBank ? matchingBank.accountNo : 'N/A',
      matchingBank ? matchingBank.accountType : 'N/A',
      matchingBank ? matchingBank.bankName : 'N/A',
      matchingBank ? matchingBank.branch : 'N/A',
      matchingVehicle ? matchingVehicle.vehicleRegistrationNo : 'N/A',
      matchingVehicle ? matchingVehicle.vehicleBrand : 'N/A',
      matchingVehicle ? matchingVehicle.vehicleModel : 'N/A'
    ];
  
    // Create a CSV string with headers and data
    let csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',') + '\n' + data.join(',');
  
    // Create a link to download the CSV file
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `application_details_${selectedApplication.nic}.csv`);
    document.body.appendChild(link);
    link.click();
  };
  
  return (
    <div className="container mx-auto p-3 bg-white dark:bg-black text-black dark:text-white min-h-screen max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Customer Dashboard</h1>

      {/* Submitted Online Applications Section */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-black p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">Submitted Online Applications</h2>
          <ul>
            {applications.map((application) => (
              <li key={application.nic} className="mb-2 p-3 border rounded-md bg-gray-800 text-white">
                <p><strong>NIC:</strong> {application.nic}</p>
                <p><strong>Full Name:</strong> {application.fullname}</p>
                <p><strong>Expected Leasing Amount:</strong> {application.expectedLeasingAmount}</p>
                <button
                  onClick={() => handleViewDetails(application)}
                  className="mt-2 py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Show selected application details */}
      {selectedApplication && (
        <div className="mt-6 bg-gray-900 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-xl font-semibold mb-4">Application Details</h3>

          {/* Application Fields */}
          <p><strong>NIC:</strong> {selectedApplication.nic}</p>
          <p><strong>Full Name:</strong> {selectedApplication.fullname}</p>
          <p><strong>Username:</strong> {userUsername}</p> {/* Display the logged-in customer's username */}
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
          <p><strong>Expected Leasing Period:</strong> {selectedApplication.expectedTimePeriod}</p>
          <p><strong>Staff Estimated Period:</strong> {selectedApplication.staffEstimatedTimePeriod}</p>

          {/* Uploaded Documents */}
          <h4 className="mt-4 text-lg font-semibold">Uploaded Documents</h4>
          <p><strong>Asset Ownership Document:</strong> <a href={selectedApplication.assetOwnershipDoc} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">View</a></p>
          <p><strong>Birth Certificate:</strong> <a href={selectedApplication.birthCertificateImage} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">View</a></p>
          <p><strong>NIC Image:</strong> <a href={selectedApplication.nicImage} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">View</a></p>
          <p><strong>Electricity Bill:</strong> <a href={selectedApplication.electricityBillImg} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">View</a></p>

          {/* Guarantor, Bank, and Vehicle Details */}
          {matchingGuarantor ? (
            <>
              <h3 className="text-lg font-semibold mt-4">Guarantor Details</h3>
              <p><strong>Guarantor NIC:</strong> {matchingGuarantor.guarantorNic}</p>
              <p><strong>Guarantor Name:</strong> {matchingGuarantor.guarantorsName}</p>
              <p><strong>Guarantor Occupation:</strong> {matchingGuarantor.guarantorOccupation}</p>
              <p><strong>Guarantor Income:</strong> {matchingGuarantor.guarantorIncome}</p>
            </>
          ) : (
            <p className="mt-4 text-red-500">No matching guarantor found.</p>
          )}

          {matchingBank ? (
            <>
              <h3 className="text-lg font-semibold mt-4">Bank Details</h3>
              <p><strong>Account No:</strong> {matchingBank.accountNo}</p>
              <p><strong>Account Type:</strong> {matchingBank.accountType}</p>
              <p><strong>Bank Name:</strong> {matchingBank.bankName}</p>
              <p><strong>Branch:</strong> {matchingBank.branch}</p>
            </>
          ) : (
            <p className="mt-4 text-red-500">No matching bank details found.</p>
          )}

          {matchingVehicle ? (
            <>
              <h3 className="text-lg font-semibold mt-4">Vehicle Details</h3>
              <p><strong>Vehicle Registration No:</strong> {matchingVehicle.vehicleRegistrationNo}</p>
              <p><strong>Vehicle Brand:</strong> {matchingVehicle.vehicleBrand}</p>
              <p><strong>Vehicle Model:</strong> {matchingVehicle.vehicleModel}</p>
            </>
          ) : (
            <p className="mt-4 text-red-500">No matching vehicle found.</p>
          )}
        </div>
      )}
      <button
            onClick={handleDownload}
            className="mt-4 py-1 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300"
          >
            Download Details as CSV
          </button>
    </div>
  );
};

export default Report;
