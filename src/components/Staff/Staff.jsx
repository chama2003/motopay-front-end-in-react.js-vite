import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Staff = () => {
const navigate = useNavigate();
  const [customerId, setCustomerId] = useState('');
  const [customerDetails, setCustomerDetails] = useState(null);

  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState('');
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [paymentCustomerId, setPaymentCustomerId] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentError, setPaymentError] = useState('');


  const [bankDetails, setBankDetails] = useState([]);
  const [guarantorDetails, setGuarantorDetails] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  // Simulate fetching submitted applications from an API
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [leasingAmount, setLeasingAmount] = useState('');
  const [leasingperiod, setLeasingperiod] = useState('');
  const [error, setError] = useState('');

  // Fetch applications from backend API
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch applications
        const applicationsResponse = await axios.get('http://localhost:8081/api/application');
        setApplications(applicationsResponse.data);

        // Fetch bank guarantee data
        const GuaranteeResponse = await axios.get('http://localhost:8081/api/guarantor');
        setGuarantorDetails(GuaranteeResponse.data);

        // Fetch vehicle data
        const vehicleDataResponse = await axios.get('http://localhost:8081/api/vehicle');
        setVehicleDetails(vehicleDataResponse.data);

        // Fetch bank data
        const bankDataResponse = await axios.get('http://localhost:8081/api/bank');
        setBankDetails(bankDataResponse.data);
      } catch (error) {
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

  // Handle viewing the details of a selected application
  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setLeasingAmount(application.staffEstimatedAmount);
  };

  // Handle saving the leasing amount for an application
  const handleSaveLeasingAmount = async () => {
    if (selectedApplication && leasingAmount) {
      try {
        // Corrected request to send 'amount' as query parameter
        const response = await axios.put(
          `http://localhost:8081/api/application/${selectedApplication.nic}/staff-estimated-amount?amount=${leasingAmount}`
        );
  
        if (response.status === 200) {
          const updatedApplications = applications.map((application) =>
            application.nic === selectedApplication.nic
              ? { ...application, staffEstimatedAmount: leasingAmount }
              : application
          );
          setApplications(updatedApplications);
          setSelectedApplication(null);
          setError('');
        } else {
          setError('Failed to update leasing amount: ' + response.statusText);
        }
      } catch (error) {
        console.error('Error updating leasing amount:', error);
        setError('Failed to update leasing amount');
      }
    } else {
      setError('Please enter a valid leasing amount');
    }
  };
  
  const handleSaveLeasingperiod = async () => {
    if (selectedApplication && leasingperiod) {
      try {
        // Corrected request to send 'amount' as query parameter
        const response = await axios.put(
          `http://localhost:8081/api/application/${selectedApplication.nic}/staff-estimated-time-period?timePeriod=${leasingperiod}`
        );
  
        if (response.status === 200) {
          const updatedApplications = applications.map((application) =>
            application.nic === selectedApplication.nic
              ? { ...application, staffEstimatedTimePeriod: leasingperiod }
              : application
          );
          setApplications(updatedApplications);
          setSelectedApplication(null);
          setError('');
        } else {
          setError('Failed to update leasing period: ' + response.statusText);
        }
      } catch (error) {
        console.error('Error updating leasing period:', error);
        setError('Failed to update leasing period');
      }
    } else {
      setError('Please enter a valid leasing period');
    }
  };

  // Simulate fetching chat messages from an API
  useEffect(() => {
    const fetchMessages = async () => {
      // Simulated data; replace with actual API call
      const fetchedMessages = [
        { id: 1, customer: 'John Doe', message: 'I need help with my application.', status: 'unread' },
        { id: 2, customer: 'Jane Smith', message: 'Can I update my contact details?', status: 'read' },
      ];
      setMessages(fetchedMessages);
    };

    fetchMessages();
  }, []);

  // Simulate fetching inquiries from an API
  useEffect(() => {
    const fetchInquiries = async () => {
      // Simulated data; replace with actual API call
      const fetchedInquiries = [
        { id: 1, customer: 'John Doe', inquiry: 'What are the requirements for leasing?', details: 'Inquiry details for John Doe' },
        { id: 2, customer: 'Jane Smith', inquiry: 'How can I extend my lease?', details: 'Inquiry details for Jane Smith' },
      ];
      setInquiries(fetchedInquiries);
    };

    fetchInquiries();
  }, []);


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
      <h1 className="text-3xl font-bold mb-6 text-center">Staff Dashboard</h1>
      
      {/* Submitted Online Applications Section */}
      <div className="bg-black p-6 rounded-lg shadow-lg mb-6">
  <h2 className="text-2xl font-semibold mb-4 text-white">Submitted Online Applications</h2>
  <ul>
  {applications.map(application => 
    application.staffEstimatedAmount === 0 && application.staffEstimatedTimePeriod === 12 && (
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
  )}
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

    {/* Staff Estimated Leasing Amount Input */}
    <div className="mt-4">
      <label htmlFor="leasing-amount" className="block text-white text-sm font-bold mb-2">
        Enter Staff Estimated Leasing Amount
      </label>
      <input
        type="number"
        id="leasing-amount"
        value={leasingAmount}
        onChange={(e) => setLeasingAmount(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
      />
        <label htmlFor="leasing-amount" className="block text-white text-sm font-bold mb-2">
        Enter Staff Estimated Leasing period
      </label>
      <input
        type="number"
        id="leasing-period"
        value={leasingperiod}
        onChange={(e) => setLeasingperiod(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
      />
    </div>

    {/* Buttons */}
    <div className="mt-4 flex space-x-4">
      <button
      onClick={() => {
        handleSaveLeasingAmount();
        handleSaveLeasingperiod();
    }}
    
        className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300"
      >
        Save Leasing Amount
      </button>
      <button
        onClick={() => setSelectedApplication(null)}
        className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-300"
      >
        Close
      </button>
    </div>
  </div>
)}
<br/>
        
        <br/><br/>
        
        <br/><br/>
        
        <br/>

      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        
  <button
    onClick={() => navigate("/viewpayment")}
    className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
  >
    view customer payment 
  </button>

  <button
    onClick={() => navigate("/chat")}
    className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
  >
    chat
  </button>

 
</div>
<br/><br/>
        
        <br/><br/>
        
        <br/>  <br/><br/>
        
        <br/><br/>
        
        <br/>  <br/><br/>
        
        <br/><br/>
        
        <br/>
    </div>
  );
};

export default Staff;
