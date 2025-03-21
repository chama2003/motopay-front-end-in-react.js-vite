import React, { useState } from "react";
import axios from "axios";

const OnlineApplication = () => {
  const [fullname, setFullname] = useState("");
  const [nic, setNic] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [address, setAddress] = useState("");
  const [residencePhoneNumber, setResidencePhoneNumber] = useState("");
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [professions, setProfessions] = useState("");
  const [nameOfEmployee, setNameOfEmployee] = useState("");
  const [designation, setDesignation] = useState("");
  const [companyMobileNo, setCompanyMobileNo] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [assetOwnership, setAssetOwnership] = useState("");
  const [assetEstimateValue, setAssetEstimateValue] = useState("");
  const [businessIncome, setBusinessIncome] = useState("");
  const [otherIncome, setOtherIncome] = useState("");
  const [assetOwnershipDoc, setAssetOwnershipDoc] = useState(null);
  const [birthCertificateImage, setBirthCertificateImage] = useState(null);
  const [nicImage, setNicImage] = useState(null);
  const [electricityBillImg, setElectricityBillImg] = useState(null);
  const [expectedLeasingAmount, setExpectedLeasingAmount] = useState("");
  const [assetNameAndLocationOfProperty, setAssetNameAndLocationOfProperty] = useState("");
  const [fixedAllowance, setFixedAllowance] = useState("");
  const [guarantorNic, setGuarantorNic] = useState("");
  const [vehicleRegistrationNo, setVehicleRegistrationNo] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [expectedlesingperiod, setexpectedlesingperiod] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  
  const [bankbookFirstpage, setBankbookFirstpage] = useState(null);
  const [guarantorNicImg, setGuarantorNicImg] = useState(null);
  const [guarantorsName, setGuarantorsName] = useState("");
  const [guarantorOccupation, setGuarantorOccupation] = useState("");
  const [guarantorIncome, setGuarantorIncome] = useState("");
  const [bankName, setbankName] = useState("");
  const [branch, setbranch] = useState("");
  const [accountType, setaccountType] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [yearOfManufacture, setYearOfManufacture] = useState("");
  const [yearOfRegistration, setYearOfRegistration] = useState("");
  const [engineNumber, setEngineNumber] = useState("");
  const [chassiNumber, setChassiNumber] = useState("");
  const [numberOfOwner, setNumberOfOwner] = useState("");
  const [exteriorColor, setExteriorColor] = useState("");
  const [interiorColor, setInteriorColor] = useState("");
  const [vehicleBookImage, setVehicleBookImage] = useState(null);
  const [vehicleFrontImg, setVehicleFrontImg] = useState(null);
  const [vehicleRearImg, setVehicleRearImg] = useState(null);
  const [vehicleRightImg, setVehicleRightImg] = useState(null);

  const [application, setApplication] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [guarantorData, setGuarantorData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    
    // Validate that all required images are uploaded
    if (!assetOwnershipDoc || !birthCertificateImage || !nicImage || !electricityBillImg) {
      alert("Please choose an image to upload.");
      return;
    }
  
    if (!bankbookFirstpage) {
      alert("Please choose a bankbook image to upload.");
      return;
    }
  
    if (!guarantorNicImg) {
      alert("Please choose a guarantor NIC image to upload.");
      return;
    }
  
    if (!vehicleBookImage || !vehicleFrontImg || !vehicleRearImg || !vehicleRightImg) {
      alert("Please upload all vehicle images.");
      return;
    }
  
    // Check if NIC already exists in the backend
    try {
      const nicExistsResponse = await axios.get(`http://localhost:8081/api/application/check-nic/${nic}`);
      if (nicExistsResponse.data.exists) {
        alert("This NIC is already registered.");
        return;  // Stop the form submission if NIC exists
      }
    } catch (error) {
      console.error("Error checking NIC:", error);
      alert("There was an error checking the NIC.");
      return;
    }
  
    // Collect form data for application, bank, guarantor, and vehicle
    const formDataApplication = new FormData();
    formDataApplication.append("Fullname", fullname);
    formDataApplication.append("nic", nic);
    formDataApplication.append("DateOfBirth", dateOfBirth);
    formDataApplication.append("Nationality", nationality);
    formDataApplication.append("Address", address);
    formDataApplication.append("ResidencePhoneNumber", residencePhoneNumber);
    formDataApplication.append("MobilePhoneNumber", mobilePhoneNumber);
    formDataApplication.append("Email", email);
    formDataApplication.append("Professions", professions);
    formDataApplication.append("nameOfEmployee", nameOfEmployee);
    formDataApplication.append("designation", designation);
    formDataApplication.append("CompanyMobileNo", companyMobileNo);
    formDataApplication.append("monthlyIncome", monthlyIncome);
    formDataApplication.append("AssetOwnership", assetOwnership);
    formDataApplication.append("AssetEstimateValue", assetEstimateValue);
    formDataApplication.append("BusinessIncome", businessIncome);
    formDataApplication.append("OtherIncome", otherIncome);
    formDataApplication.append("AssetOwnershipDoc", assetOwnershipDoc);  // File
    formDataApplication.append("BirthCertificateImage", birthCertificateImage);  // File
    formDataApplication.append("NicImage", nicImage);  // File
    formDataApplication.append("ElectricityBillImg", electricityBillImg);  // File
    formDataApplication.append("ExpectedLeasingAmount", expectedLeasingAmount);
    formDataApplication.append("AssetNameAndLocationOfProperty", assetNameAndLocationOfProperty);
    formDataApplication.append("FixedAllowance", fixedAllowance);
    formDataApplication.append("GuarantorNic", guarantorNic);
    formDataApplication.append("VehicleRegistrationNo", vehicleRegistrationNo);
    formDataApplication.append("userId", userId);
    formDataApplication.append("accountNo", accountNo);
    formDataApplication.append("ExpectedLesingPeriod", expectedlesingperiod); // Fixed spelling error
  
    // Bank Details
    const formDataBank = new FormData();
    formDataBank.append("accountno", accountNo);
    formDataBank.append("BankName", bankName);
    formDataBank.append("Branch", branch);
    formDataBank.append("AccountType", accountType);
    formDataBank.append("image", bankbookFirstpage);
  
    // Guarantor Details
    const formDataGuarantor = new FormData();
    formDataGuarantor.append("nic", guarantorNic);
    formDataGuarantor.append("image", guarantorNicImg);
    formDataGuarantor.append("name", guarantorsName);
    formDataGuarantor.append("occupation", guarantorOccupation);
    formDataGuarantor.append("income", guarantorIncome);
  
    // Vehicle Details
    const formDataVehicle = new FormData();
    formDataVehicle.append("regino", vehicleRegistrationNo);
    formDataVehicle.append("VehicleBrand", vehicleBrand);
    formDataVehicle.append("VehicleModel", vehicleModel);
    formDataVehicle.append("YearOfManufacture", yearOfManufacture);
    formDataVehicle.append("YearOfRegistration", yearOfRegistration);
    formDataVehicle.append("EngineNumber", engineNumber);
    formDataVehicle.append("ChassiNumber", chassiNumber);
    formDataVehicle.append("NumberOfOwner", numberOfOwner);
    formDataVehicle.append("ExteriorColor", exteriorColor);
    formDataVehicle.append("InteriorColor", interiorColor);
    formDataVehicle.append("VehicleBookImageimage", vehicleBookImage);
    formDataVehicle.append("VehicleFrontImgimage", vehicleFrontImg);
    formDataVehicle.append("VehicleRearImgimage", vehicleRearImg);
    formDataVehicle.append("VehicleRightImgimage", vehicleRightImg);
  
    try {
      // Submit Application Data
      const applicationResponse = await axios.post("http://localhost:8081/api/application/add", formDataApplication, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Submit Bank Details
      const bankResponse = await axios.post("http://localhost:8081/api/bank/add", formDataBank, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Submit Guarantor Details
      const guarantorResponse = await axios.post("http://localhost:8081/api/guarantor", formDataGuarantor, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Submit Vehicle Details
      const vehicleResponse = await axios.post("http://localhost:8081/api/vehicle/add", formDataVehicle, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Handle successful submissions for each section
      setApplication([...application, applicationResponse.data]);
      setBankData([...bankData, bankResponse.data]);
      setGuarantorData([...guarantorData, guarantorResponse.data]);
      setVehicleData([...vehicleData, vehicleResponse.data]);
  
      // Reset all states after successful submission
      resetFormStates(); // This is a function to reset the form fields
  
      alert("Application sent successfully!");
    } catch (error) {
      alert("Error during submission:", error);
    }
  };
  
  const resetFormStates = () => {
    setFullname("");
    setNic("");
    setDateOfBirth("");
    setNationality("");
    setAddress("");
    setResidencePhoneNumber("");
    setMobilePhoneNumber("");
    setEmail("");
    setProfessions("");
    setNameOfEmployee("");
    setDesignation("");
    setCompanyMobileNo("");
    setMonthlyIncome("");
    setAssetOwnership("");
    setAssetEstimateValue("");
    setBusinessIncome("");
    setOtherIncome("");
    setAssetOwnershipDoc(null);
    setBirthCertificateImage(null);
    setNicImage(null);
    setElectricityBillImg(null);
    setExpectedLeasingAmount("");
    setAssetNameAndLocationOfProperty("");
    setFixedAllowance("");
    setGuarantorNic("");
    setVehicleRegistrationNo("");
    setAccountNo("");
    setaccountType("");
    setbankName("");
    setbranch("");
    setBankbookFirstpage(null);
    setGuarantorNicImg(null);
    setGuarantorsName("");
    setGuarantorOccupation("");
    setexpectedlesingperiod("");
    setGuarantorIncome("");
    setVehicleBookImage(null);
    setVehicleFrontImg(null);
    setVehicleRearImg(null);
    setVehicleRightImg(null);
  };
  
  return (
    <div className="bg-lightblue-100 dark:bg-dark min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-yellow-500 rounded-lg shadow-lg p-10 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-black-600">Vehicle Leasing Application</h1>
        <form onSubmit={handleSubmit}>
          {/* Section 1: Particulars of the Applicant */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-6 text-black-500">Particulars of the Applicant</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1" htmlFor="full-name">Full Name (as per NIC)</label>
                <input  type="text"
                  id="full-name"
                  className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  name="fullname"
                  data-section="applicationDetails"
                
                required 
                
                
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="nic-no">NIC Number</label>
                <input type="number" id="nic-no" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                name="nic"
                data-section="applicationDetails"
                required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="dob">Date of Birth</label>
                <input type="date" id="dob" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  name="dateOfBirth"
                  data-section="applicationDetails"
                required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="nationality">Nationality</label>
                <input type="text" id="nationality" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                 value={nationality}
                 onChange={(e) => setNationality(e.target.value)}
                
                data-section="applicationDetails"
                 name="nationality"
                required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="permanent-address">Permanent Address</label>
                <input type="text" id="permanent-address" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                   value={address}
                   onChange={(e) => setAddress(e.target.value)}
                   name="address"
                  data-section="applicationDetails"
                required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="residence-phone">Residence Phone Number</label>
                <input type="number" id="residence-phone" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                value={residencePhoneNumber}
                onChange={(e) => setResidencePhoneNumber(e.target.value)}
                  data-section="applicationDetails"
                   name="residencePhoneNumber"
                required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="mobile-phone">Mobile Phone Number</label>
                <input type="number" id="mobile-phone" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                   value={mobilePhoneNumber}
                   onChange={(e) => setMobilePhoneNumber(e.target.value)}
                  data-section="applicationDetails"
                   name="mobilePhoneNumber"
                required />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                <input type="email" id="email" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                  data-section="applicationDetails"
                   name="email"
                required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="profession">Profession</label>
                <input type="text" id="profession" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                 value={professions}
                 onChange={(e) => setProfessions(e.target.value)}
                  data-section="applicationDetails"
                   name="professions"
                required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="employer">Name of the Employer /  Business</label>
                <input type="text" id="employer" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                   value={nameOfEmployee}
                   onChange={(e) => setNameOfEmployee(e.target.value)}
                   name="nameOfEmployee"
                  data-section="applicationDetails"
                required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="designation">Designation</label>
                <input type="text" id="designation" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                   value={designation}
                   onChange={(e) => setDesignation(e.target.value)}
                   name="designation"
                  data-section="applicationDetails"
                required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="company-mobile">Company Mobile Number</label>
                <input type="number" id="company-mobile" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                   value={companyMobileNo}
                   onChange={(e) => setCompanyMobileNo(e.target.value)}
                   name="companyMobileNo"
                  data-section="applicationDetails"
                required />
              </div>
              <div className="col-span-2">
  <label className="block text-sm font-medium mb-1" htmlFor="document">Submit Birthday Certificate (PNG, PDF, JPEG)</label>
  <input
    type="file"
    id="document"
    accept=".png, .pdf, .jpeg"
    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    onChange={(e) => setBirthCertificateImage(e.target.files[0])}
    name="birthCertificateImage" // This is the name for the input field
    data-section="applicationDetails" // This updates the applicationDetails section in the state
    required
  />
</div>

              <div className="col-span-2">
  <label className="block text-sm font-medium mb-1" htmlFor="document">Submit NIC (PNG, PDF, JPEG)</label>
  <input
    type="file"
    id="document"
    accept=".png, .pdf, .jpeg"
    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    onChange={(e) => setNicImage(e.target.files[0])}// Handle file input changes
    name="nicImage" // This is the name for the input
    data-section="applicationDetails" // This will update the applicationDetails section of the state
    required
  />
</div>

<div className="col-span-2">
  <label className="block text-sm font-medium mb-1" htmlFor="document">Submit AssetOwnershipDoc (PNG, PDF, JPEG)</label>
  <input
    type="file"
    id="document"
    accept=".png, .pdf, .jpeg"
    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    onChange={(e) => setAssetOwnershipDoc(e.target.files[0])}
    name="birthCertificateImage" // This is the name for the input field
    data-section="applicationDetails" // This updates the applicationDetails section in the state
    required
  />
</div>

            </div>
          </section>

          {/* Section 2: Monthly Financial Details */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-6 text-black-500">Monthly Financial Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="monthly-income">Monthly Income</label>
                <input type="number" id="monthly-income" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                   value={monthlyIncome}
                   onChange={(e) => setMonthlyIncome(e.target.value)}
                   name="monthlyIncome"
                  data-section="applicationDetails"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="fixed-allowance">Fixed Allowance</label>
                <input type="number" id="fixed-allowance" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                    value={fixedAllowance}
                    onChange={(e) => setFixedAllowance(e.target.value)}
                   name="fixedAllowance"
                  data-section="applicationDetails"
                   required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="other-income">Other Income</label>
                <input type="number" id="other-income" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(e.target.value)}
                   name="otherIncome"
                  data-section="applicationDetails" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="business-income">Business Income</label>
                <input type="number" id="business-income" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                    value={businessIncome}
                    onChange={(e) => setBusinessIncome(e.target.value)}
                   name="businessIncome"
                  data-section="applicationDetails"
                   required />
              </div>
              <div className="col-span-2">
  <label className="block text-sm font-medium mb-1" htmlFor="document">Submit electricityBillImg(PNG, PDF, JPEG)</label>
  <input
    type="file"
    id="document"
    accept=".png, .pdf, .jpeg"
    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    onChange={(e) => setElectricityBillImg(e.target.files[0])}
    name="electricityBillImg" // This is the name for the input field
    data-section="applicationDetails" // This updates the applicationDetails section in the state
    required
  />
</div>
            </div>
          </section>

          {/* Section 3: Details of the Guarantors */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-6 text-black-500">Details of the Guarantors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="guarantor-name">Name with Initials</label>
                <input type="text" id="guarantor-name" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                   value={guarantorsName}
                   onChange={(e) => setGuarantorsName(e.target.value)}
                   name="guarantorsName"
                  data-section="guarantorDetails"
                required />
              </div>
              <div>
  <label className="block text-sm font-medium mb-1" htmlFor="guarantor-nic">Guarantor NIC</label>
  
  {/* First input for Guarantor Details */}
  <input 
    type="number" 
    id="guarantor-nic" 
    name="guarantorNic"  // Use a unique name for the input field
    value={guarantorNic}
    onChange={(e) => setGuarantorNic(e.target.value)}
    data-section="guarantorDetails"  // This indicates we're updating the guarantorDetails section
    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    required 
  />
</div>




              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="guarantor-occupation">Occupation</label>
                <input type="text" id="guarantor-occupation" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                  value={guarantorOccupation}
                  onChange={(e) => setGuarantorOccupation(e.target.value)}
                  name="guarantorOccupation"
                 data-section="guarantorDetails"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="guarantor-income">Income</label>
                <input type="number" id="guarantor-income" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                 
                  name="guarantorIncome"
                  value={guarantorIncome}
                  onChange={(e) => setGuarantorIncome(e.target.value)}
                 data-section="guarantorDetails"
                 required />
              </div>
              <div className="col-span-2">
  <label className="block text-sm font-medium mb-1" htmlFor="document">Submit Guarantor NIC (PNG, PDF, JPEG)</label>
  <input
    type="file"
    id="document"
    accept=".png, .pdf, .jpeg"
    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    onChange={(e) => setGuarantorNicImg(e.target.files[0])}
    // Handle file input changes
    name="guarantorNicImg" // This is the name for the input field
    data-section="guarantorDetails" // This updates the guarantorDetails section in the state
    required
  />
</div>

            </div>
          </section>

          {/* Section 4: Bank Details */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-6 text-black-500">Bank Details of Applicant</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="bank-name">Bank Name</label>
                <input type="text" id="bank-name" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                   value={bankName}
                   onChange={(e) => setbankName(e.target.value)}
                  name="bankName"
                 data-section="bankDetails"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="branch">Branch</label>
                <input type="text" id="branch" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                value={branch}
                onChange={(e) => setbranch(e.target.value)}
                  name="branch"
                 data-section="bankDetails"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="account-type">Account Type</label>
                <input type="text" id="account-type" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                  value={accountType}
                  onChange={(e) => setaccountType(e.target.value)}
                  name="accountType"
                 data-section="bankDetails"
                  required />
              </div>
              <div>
  <label className="block text-sm font-medium mb-1" htmlFor="account-no">Account Number</label>
  
  {/* First input for Bank Details */}
  <input 
    type="number" 
    id="account-no" 
    name="accountNo"  // This is the correct field name for Bank Details
    value={accountNo}
    onChange={(e) => setAccountNo(e.target.value)}
    data-section="bankDetails"  // This indicates we're updating the bankDetails section
    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    required 
  />
</div>


<div className="col-span-2">
  <label className="block text-sm font-medium mb-1" htmlFor="document">Submit Bank Book Front Page Photo (PNG, PDF, JPEG)</label>
  <input
    type="file"
    id="document"
    accept=".png, .pdf, .jpeg"
    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    onChange={(e) => setBankbookFirstpage(e.target.files[0])} // Handle file input changes
    name="bankbookFirstpage" // This is the name for the input field
    data-section="bankDetails" // This updates the bankDetails section in the state
    required
  />
</div>

            </div>
          </section>

          {/* Section 5: Assets Owned by Applicant */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-6 text-black-500">Assets Owned by Applicant</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1" htmlFor="property-name">Name and Location of the Property</label>
                <input type="text" id="property-name" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                 value={assetNameAndLocationOfProperty}
                 onChange={(e) => setAssetNameAndLocationOfProperty(e.target.value)}
                  name="assetNameAndLocationOfProperty"
                 data-section="applicationDetails" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="estimated-value">Estimated Value</label>
                <input type="number" id="estimated-value" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                value={assetEstimateValue}
                onChange={(e) => setAssetEstimateValue(e.target.value)}
                    name="assetEstimateValue"
                   data-section="applicationDetails"
                required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="ownership">Ownership</label>
                <input type="text" id="ownership" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                   value={assetOwnership}
                   onChange={(e) => setAssetOwnership(e.target.value)}
                    name="assetOwnership"
                   data-section="applicationDetails"
                    required />
              </div>
              <div className="col-span-2">
  <label className="block text-sm font-medium mb-1" htmlFor="document">Submit Ownership Document (PNG, PDF, JPEG)</label>
  <input
    type="file"
    id="document"
    accept=".png, .pdf, .jpeg"
    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    onChange={(e) => setAssetOwnershipDoc(e.target.files[0])}
    name="assetOwnershipDoc" // This is the name for the input field
    data-section="applicationDetails" // This updates the applicationDetails section in the state
    required
  />
</div>

            </div>
          </section>

          {/* Section 6: Vehicle Details */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-6 text-black-500">Vehicle Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="vehicle-make">Vehicle Brand</label>
                <input type="text" id="vehicle-brand" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                 value={vehicleBrand}
                 onChange={(e) => setVehicleBrand(e.target.value)}
                   name="vehicleBrand"
                  data-section="vehicleDetails"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="vehicle-model">Vehicle Model</label>
                <input type="text" id="vehicle-model" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                 value={vehicleModel}
                 onChange={(e) => setVehicleModel(e.target.value)}
                   name="vehicleModel"
                  data-section="vehicleDetails"
                  required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="vehicle-year">Year of Manufacture</label>
                <input type="number" id="vehicle-year-manufacture" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                  value={yearOfManufacture}
                  onChange={(e) => setYearOfManufacture(e.target.value)}
                   name="yearOfManufacture"
                  data-section="vehicleDetails"
                required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="vehicle-year">Year of Registration</label>
                <input type="number" id="vehicle-year-registration" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                    value={yearOfRegistration}
                    onChange={(e) => setYearOfRegistration(e.target.value)}
                     name="yearOfRegistration"
                    data-section="vehicleDetails"
                
                required />
              </div>
              <div>
  <label htmlFor="vehicleRegistrationNo">Vehicle Registration No</label>
  <input
    type="number"
    id="vehicleRegistrationNo"
    name="vehicleRegistrationNo" // This will be used for applicationDetails
    value={vehicleRegistrationNo}
    onChange={(e) => setVehicleRegistrationNo(e.target.value)}
    data-section="applicationDetails" // This handles the Application table
    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    required
  />
</div>





            
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1" htmlFor="ownership">Engine No</label>
                <input type="number" id="engineno" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                     value={engineNumber}
                     onChange={(e) => setEngineNumber(e.target.value)}
                     name="engineNumber"
                    data-section="vehicleDetails"
                     required />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1" htmlFor="ownership">Chassis No</label>
                <input type="number" id="chassisno" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                     value={chassiNumber}
                     onChange={(e) => setChassiNumber(e.target.value)}
                     name="chassiNumber"
                    data-section="vehicleDetails"
                     required />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1" htmlFor="ownership">No of Owners</label>
                <input type="number" id="ownersno" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                     value={numberOfOwner}
                     onChange={(e) => setNumberOfOwner(e.target.value)}
                     name="numberOfOwner"
                    data-section="vehicleDetails"
                     required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="vehicle-model">Exterior Color</label>
                <input type="text" id="exterior" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                     value={exteriorColor}
                     onChange={(e) => setExteriorColor(e.target.value)}
                     name="exteriorColor"
                    data-section="vehicleDetails"
                required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="vehicle-model">Interior Color</label>
                <input type="text" id="interior" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                     value={interiorColor}
                     onChange={(e) => setInteriorColor(e.target.value)}
                     name="interiorColor"
                    data-section="vehicleDetails"
                required />
              </div>
              <div className="col-span-2">
  <label className="block text-sm font-medium mb-1" htmlFor="document">Submit Vehicle Book (PNG, PDF, JPEG)</label>
  <input
    type="file"
    id="document"
    accept=".png, .pdf, .jpeg"
    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    onChange={(e) => setVehicleBookImage(e.target.files[0])}
     // Handle file input changes
    name="vehicleBookImage" // The name for the input field
    data-section="vehicleDetails" // This will update the vehicleDetails section in the state
    required
  />
</div>

<div className="col-span-2">
  <label className="block text-sm font-medium mb-1" htmlFor="document">Submit Vehicle Front Side Photo (PNG, PDF, JPEG)</label>
  <input
    type="file"
    id="document"
    accept=".png, .pdf, .jpeg"
    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    onChange={(e) => setVehicleFrontImg(e.target.files[0])}
     // Handle file input changes
    name="vehicleFrontImg" // This is the name for the input field
    data-section="vehicleDetails" // This updates the vehicleDetails section in the state
    required
  />
</div>

<div className="col-span-2">
  <label className="block text-sm font-medium mb-1" htmlFor="document">Submit Vehicle Rear Side Photo (PNG, PDF, JPEG)</label>
  <input
    type="file"
    id="document"
    accept=".png, .pdf, .jpeg"
    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    onChange={(e) => setVehicleRearImg(e.target.files[0])} // Handle file input changes
    name="vehicleRearImg" // This is the name for the input field
    data-section="vehicleDetails" // This updates the vehicleDetails section in the state
    required
  />
</div>

<div className="col-span-2">
  <label className="block text-sm font-medium mb-1" htmlFor="document">Submit Vehicle Right Side Photo (PNG, PDF, JPEG)</label>
  <input
    type="file"
    id="document"
    accept=".png, .pdf, .jpeg"
    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
    onChange={(e) => setVehicleRightImg(e.target.files[0])}
 // Handle file input changes
    name="vehicleRightImg" // The name for the input field
    data-section="vehicleDetails" // This updates the vehicleDetails section in the state
    required
  />
</div>

            </div>
          </section>

          {/* Section 6: Vehicle Details */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-6 text-black-500">Leasing Amount</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="vehicle-make">Expected Leasing Amount</label>
                <input type="number" id="leasing-amount" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                  value={expectedLeasingAmount}
                  onChange={(e) => setExpectedLeasingAmount(e.target.value)}
                     name="expectedLeasingAmount"
                    data-section="applicationDetails"
                    required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="vehicle-make1">Expected Leasing Period</label>
                <input type="number" id="leasing-period" className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md" 
                    value={expectedlesingperiod}
                    onChange={(e) => setexpectedlesingperiod(e.target.value)}
                     name="expectedTimePeriod"
                    data-section="applicationDetails"
                    required />
              </div>
              
            </div>
          </section>

          <button type="submit" className="w-full py-3 px-5 bg-yellow-700 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default OnlineApplication;