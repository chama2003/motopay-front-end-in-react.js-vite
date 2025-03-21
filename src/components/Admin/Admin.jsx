import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Admin = () => {
  useEffect(() => {
      const loggedIn = localStorage.getItem("userLoggedIn");  // Check if the user is logged in
      if (loggedIn) {
        setIsLoggedIn(true);
      }
    }, []);
  const [staffId, setStaffId] = useState('');
  const [staffDetails, setStaffDetails] = useState(null);
  const [error, setError] = useState('');
  const [newStaffDetails, setNewStaffDetails] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    username: '',
    password: ''
  });
  const [isConfirmed, setIsConfirmed] = useState(false); // state for confirmation
  const [isRejected, setIsRejected] = useState(false);
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [confirmedApplications, setConfirmedApplications] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [customerDetails, setCustomerDetails] = useState(null);
  const [customerError, setCustomerError] = useState('');
  const [paymentCustomerId, setPaymentCustomerId] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentError, setPaymentError] = useState('');
  const [isEditingStaff, setIsEditingStaff] = useState(false);
  const navigate = useNavigate();
 const [bankDetails, setBankDetails] = useState([]);
  const [guarantorDetails, setGuarantorDetails] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  // Simulate fetching submitted applications from an API
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [leasingAmount, setLeasingAmount] = useState('');
  const [leasingperiod, setLeasingperiod] = useState('');
  // Simulate fetching confirmed applications from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch application data
        const applicationsResponse = await axios.get('http://localhost:8081/api/application');
        setApplications(applicationsResponse.data);

        // Fetch guarantor data
        const GuaranteeResponse = await axios.get('http://localhost:8081/api/guarantor');
        setGuarantorDetails(GuaranteeResponse.data);

        // Fetch vehicle data
        const vehicleDataResponse = await axios.get('http://localhost:8081/api/vehicle');
        setVehicleDetails(vehicleDataResponse.data);

        // Fetch bank data
        const bankDataResponse = await axios.get('http://localhost:8081/api/bank');
        setBankDetails(bankDataResponse.data);
      } catch (error) {
        // Error when fetching data from the APIs
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);
  const matchingGuarantor = guarantorDetails.find(
    (guarantor) => guarantor.guarantorNic === selectedApplication?.guarantorNic
  );

  const matchingVehicle = vehicleDetails.find(
    (vehicle) => vehicle.vehicleRegistrationNo === selectedApplication?.vehicleRegistrationNo
  );

  const matchingbank = bankDetails.find(
    (bank) => bank.accountNo === selectedApplication?.accountNo
  );
  const handleViewDetails = (application) => {
    // Error when selecting an application that doesn't exist
    if (!application) {
      setError('Application not found');
      return;
    }
    setSelectedApplication(application);
    setLeasingAmount(application.expectedLeasingAmount);
    setLeasingPeriod(application.expectedTimePeriod);
  };

  const handleSearchStaff = () => {
    // Simulated data; replace with actual API call
    const fetchedStaffDetails = {
      id: '54321',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '987-654-3210',
      position: 'Manager',
      username: 'jane.doe',
      password: 'password123'
    };

    if (staffId === fetchedStaffDetails.id) {
      setStaffDetails(fetchedStaffDetails);
      setError('');
    } else {
      setStaffDetails(null);
      setError('Staff member not found');
    }
  };
  const handleConfirm = async () => {
    console.log('Confirming application for NIC:', selectedApplication.nic);
    if (selectedApplication) {
      try {
        // Send the request to update the customer status to "approved"
        const response = await axios.put(
          `http://localhost:8081/api/application/${selectedApplication.nic}/admin-status?status=approved`
        );
  
        if (response.status === 200) {
          // Update the application list and mark the application as confirmed
          setApplications(prevApplications =>
            prevApplications.map(application =>
              application.nic === selectedApplication.nic
                ? { ...application, adminstatus: 'approved' }
                : application
            )
          );
          setIsConfirmed(true);
          setSelectedApplication(null);
          navigate(`/AdminPayment/${selectedApplication.userId}`);
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
          `http://localhost:8081/api/application/${selectedApplication.nic}/admin-status?status=rejected`
        );

        if (response.status === 200) {
          // Update the application list and mark the application as rejected
          setApplications(prevApplications =>
            prevApplications.map(application =>
              application.nic === selectedApplication.nic
                ? { ...application, adminstatus: 'rejected' }
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
  const handleEditStaff = () => {
    setIsEditingStaff(true);
  };

  const handleSaveEditStaff = () => {
    // Logic for saving edited staff details
    console.log('Save edited staff details:', staffDetails);
    setIsEditingStaff(false);
  };

  const handleDeleteStaff = () => {
    // Logic for deleting staff member
    console.log('Delete staff member:', staffDetails.id);
    setStaffDetails(null);
    setError('');
  };

  const handleAddStaff = () => {
    // Logic for adding new staff member
    console.log('Add new staff member:', newStaffDetails);
    setShowAddStaffForm(false);
    setNewStaffDetails({
      id: '',
      name: '',
      email: '',
      phone: '',
      position: '',
      username: '',
      password: ''
    });
  };

  const handleCreateCustomerAccount = (application) => {
    // Logic for creating a customer account
    console.log('Create customer account for:', application.customerName);
    // Here you can add the logic to create a customer account in the database
  };

  const handleSearchCustomer = () => {
    // Simulate fetching customer details from an API
    const fetchedCustomerDetails = {
      id: '12345',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, City, Country',
      leasingAmount: 5000,
      leasingPeriod: 12
    };

    if (customerId === fetchedCustomerDetails.id) {
      setCustomerDetails(fetchedCustomerDetails);
      setCustomerError('');
    } else {
      setCustomerDetails(null);
      setCustomerError('Customer not found');
    }
  };

  const handleEditCustomer = () => {
    // Logic for editing customer details
    console.log('Edit customer details:', customerDetails);
  };

  const handleDeleteCustomer = () => {
    // Logic for deleting customer details
    console.log('Delete customer:', customerDetails.id);
    setCustomerDetails(null);
    setCustomerError('');
  };

  const handleSearchPayment = () => {
    // Simulate fetching payment details from an API
    const fetchedPaymentDetails = {
      id: '12345',
      payments: [
        { date: '2025-01-01', amount: 100, status: 'Paid' },
        { date: '2025-02-01', amount: 100, status: 'Paid' },
        { date: '2025-03-01', amount: 100, status: 'Pending' },
      ],
    };

    if (paymentCustomerId === fetchedPaymentDetails.id) {
      setPaymentDetails(fetchedPaymentDetails);
      setPaymentError('');
    } else {
      setPaymentDetails(null);
      setPaymentError('Payment details not found');
    }
  };

  const handleEditPayment = () => {
    // Logic for editing payment details
    console.log('Edit payment details:', paymentDetails);
  };
  const downloadFile = (fileName) => {
    const url = `http://localhost:8081/api/application/download/asset-ownership/${fileName}`;
    
    // Create an XMLHttpRequest to fetch the image
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';  // Make sure we get the file as a blob
    xhr.onload = function() {
      const blob = xhr.response;
      const link = document.createElement('a');
      const objectURL = URL.createObjectURL(blob);
      link.href = objectURL;
      link.download = fileName;  // The filename the user will download
      link.click();  // Simulate the click to download the file
      URL.revokeObjectURL(objectURL);  // Clean up the object URL
    };
    xhr.onerror = function() {
      alert("Error downloading the file.");
    };
    xhr.send();
  };
  
  const downloadFile2 = (fileName) => {
    const url = `http://localhost:8081/api/vehicle/download/vehicle-right/${fileName}`;
    
    // Create an XMLHttpRequest to fetch the image
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';  // Make sure we get the file as a blob
    xhr.onload = function() {
      const blob = xhr.response;
      const link = document.createElement('a');
      const objectURL = URL.createObjectURL(blob);
      link.href = objectURL;
      link.download = fileName;  // The filename the user will download
      link.click();  // Simulate the click to download the file
      URL.revokeObjectURL(objectURL);  // Clean up the object URL
    };
    xhr.onerror = function() {
      alert("Error downloading the file.");
    };
    xhr.send();
  };
  const downloadFile3 = (fileName) => {
    const url = `http://localhost:8081/api/guarantor/download/${fileName}`;
    
    // Create an XMLHttpRequest to fetch the image
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';  // Make sure we get the file as a blob
    xhr.onload = function() {
      const blob = xhr.response;
      const link = document.createElement('a');
      const objectURL = URL.createObjectURL(blob);
      link.href = objectURL;
      link.download = fileName;  // The filename the user will download
      link.click();  // Simulate the click to download the file
      URL.revokeObjectURL(objectURL);  // Clean up the object URL
    };
    xhr.onerror = function() {
      alert("Error downloading the file.");
    };
    xhr.send();
  };
  const downloadFile4 = (fileName) => {
    const url = `http://localhost:8081/api/bank/download/${fileName}`;
    
    // Create an XMLHttpRequest to fetch the image
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';  // Make sure we get the file as a blob
    xhr.onload = function() {
      const blob = xhr.response;
      const link = document.createElement('a');
      const objectURL = URL.createObjectURL(blob);
      link.href = objectURL;
      link.download = fileName;  // The filename the user will download
      link.click();  // Simulate the click to download the file
      URL.revokeObjectURL(objectURL);  // Clean up the object URL
    };
    xhr.onerror = function() {
      alert("Error downloading the file.");
    };
    xhr.send();
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      
    

      {/* Confirmed Customer Applications Section */}
      
      <div className="bg-black p-6 rounded-lg shadow-lg mb-6">
  <h2 className="text-2xl font-semibold mb-4 text-white">Submitted Online Applications</h2>
  <ul>
    {applications.map(application => (
      application.adminStatus !== "approved" && application.customerStatus === "approved" &&(
        <li key={application.nic} className="mb-2 p-3 border rounded-md bg-gray-800 text-white">
          <p><strong>NIC:</strong> {application.nic}</p>
          <p><strong>Full Name:</strong> {application.fullname}</p>
          <p><strong>Leasing Amount:</strong> Rs{application.staffEstimatedAmount}</p>
          <p><strong>Leasing Period:</strong> {application.staffEstimatedTimePeriod} months</p>
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
    <p><strong>Expected Leasing period:</strong> {selectedApplication.expectedTimePeriod}</p>
    <p><strong>Staff Estimated period:</strong> {selectedApplication.staffEstimatedTimePeriod}</p>
    {/* Uploaded Documents */}
    <h4 className="mt-4 text-lg font-semibold">Uploaded Documents</h4>
    <p><strong>Asset Ownership Document:</strong> 
  <button
    onClick={() => downloadFile(selectedApplication.assetOwnershipDoc)}
    className="text-blue-400 underline"
  >
    Download Image
  </button>
</p>

<p><strong>Birth Certificate:</strong> 
  <button
    onClick={() => downloadFile(selectedApplication.birthCertificateImage)}
    className="text-blue-400 underline"
  >
    Download Image
  </button>
</p>

<p><strong>NIC Image:</strong>  
  <button
    onClick={() => downloadFile(selectedApplication.nicImage)}
    className="text-blue-400 underline"
  >
    Download Image
  </button>
</p>

<p><strong>Electricity Bill:</strong>  
  <button
    onClick={() => downloadFile(selectedApplication.electricityBillImg)}
    className="text-blue-400 underline"
  >
    Download Image
  </button>
</p>
     {matchingGuarantor ? (
  <>
    <h3 className="text-lg font-semibold mt-4">Guarantor Details</h3>
    <p><strong>Guarantor NIC:</strong> {matchingGuarantor.guarantorNic}</p>
    <p><strong>Guarantor Name:</strong> {matchingGuarantor.guarantorsName}</p>
    <p><strong>Guarantor Occupation:</strong> {matchingGuarantor.guarantorOccupation}</p>
    <p><strong>Guarantor Income:</strong> {matchingGuarantor.guarantorIncome}</p>
    
    {matchingGuarantor.guarantorNicImg && (
      <div>
         <strong>Guarantor NIC Image:</strong>
        
        <button
   onClick={() => downloadFile3(matchingGuarantor.guarantorNicImg)}
   className="text-blue-400 underline"
 >
   Download Image
 </button>
      </div>
    )}
  </>
) : (
  <p className="mt-4 text-red-500">No matching guarantor found.</p>
)}
{matchingbank ? (
  <>
    <h3 className="text-lg font-semibold mt-4">Bank Details</h3>
    <p><strong>Account No:</strong> {matchingbank.accountNo}</p>
    <p><strong>Account Type:</strong> {matchingbank.accountType}</p>
    <p><strong>Bank Name:</strong> {matchingbank.bankName}</p>
    <p><strong>Branch:</strong> {matchingbank.branch}</p>
    
    {matchingbank.bankbookFirstpage && (
      <div>
       <strong>Bank Book Image:</strong>
        
        <button
   onClick={() => downloadFile4(matchingbank.bankbookFirstpage)}
   className="text-blue-400 underline"
 >
         Download Image
         </button>
      </div>
    )}
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
    <p><strong>Year of Manufacture:</strong> {matchingVehicle.yearOfManufacture}</p>
    <p><strong>Year of Registration:</strong> {matchingVehicle.yearOfRegistration}</p>
    <p><strong>Engine Number:</strong> {matchingVehicle.engineNumber}</p>
    <p><strong>Chassis Number:</strong> {matchingVehicle.chassiNumber}</p>
    <p><strong>Number of Owners:</strong> {matchingVehicle.numberOfOwner}</p>
    <p><strong>Exterior Color:</strong> {matchingVehicle.exteriorColor}</p>
    <p><strong>Interior Color:</strong> {matchingVehicle.interiorColor}</p>

    {/* Display Vehicle Images */}
    {matchingVehicle.vehicleBookImage && (
      <div>
        <strong>Vehicle Book Image:</strong>
        <button
    onClick={() => downloadFile2(matchingVehicle.vehicleBookImage)}
    className="text-blue-400 underline"
  >
    Download Image
  </button>
        
      </div>
    )}

    {matchingVehicle.vehicleFrontImg && (
      <div>
        <strong>Vehicle Front Image:</strong>
        <button
    onClick={() => downloadFile2(matchingVehicle.vehicleFrontImg)}
    className="text-blue-400 underline"
  >
    Download Image
  </button>
       
      </div>
    )}

    {matchingVehicle.vehicleRearImg && (
      <div>
        <strong>Vehicle Rear Image:</strong>
        <button
    onClick={() => downloadFile2(matchingVehicle.vehicleRearImg)}
    className="text-blue-400 underline"
  >
    Download Image
  </button>
        
      </div>
    )}

    {matchingVehicle.vehicleRightImg && (
      <div>
        <strong>Vehicle Right Side Image:</strong>
        <button
    onClick={() => downloadFile2(matchingVehicle.vehicleRightImg)}
    className="text-blue-400 underline"
  >
    Download Image
  </button>
      </div>
    )}
  </>
) : (
  <p className="mt-4 text-red-500">No matching vehicle found.</p>
)}

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

      
<br/>
        
        <br/><br/>
        
        <br/><br/>
        
        <br/><br/>
        
        <br/><br/>
        
        <br/>
      {/* Action Buttons Section */}
<div className="mt-6 flex flex-wrap gap-4 justify-center">
  <button
    onClick={() => navigate("/adminblogpost")}
    className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
  >
    Manage Blogpost
  </button>

  <button
    onClick={() => navigate("/adminadvertistment")}
    className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
  >
    Manage Advertisement
  </button>

  <button
    onClick={() => navigate("/managetestimonials")}
    className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
  >
    Manage Testimonial
  </button>

  <button
    onClick={() => navigate("/managegallery")}
    className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
  >
    Manage Gallery
  </button>
  <button
    onClick={() => navigate("/managevehicle")}
    className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
  >
    Manage maximum leasing value
  </button>
  <button
    onClick={() => navigate("/managestaff")}
    className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
  >
    manage staff 
  </button>
  <button
    onClick={() => navigate("/managequary")}
    className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
  >
    manage Inquary
  </button>
  <button
    onClick={() => navigate("/managecustomer")}
    className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
  >
    manage customer
  </button>
  <button
    onClick={() => navigate("/manageuser")}
    className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
  >
    manage user
  </button>
</div>
    </div>
);
};

export default Admin;