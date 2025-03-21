import React, { useState, useEffect } from "react";
import axios from "axios";

const CarList = () => {
  // State for switching between calculators
  const [activeCalculator, setActiveCalculator] = useState("maximum");

  // State for Maximum Leasing Calculator
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [maxLeasingAmount, setMaxLeasingAmount] = useState(null);

  // State for Leasing Calculator
  const [leasingAmount, setLeasingAmount] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyInstallment, setMonthlyInstallment] = useState(null);

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    // Fetch brands from the backend when component loads
    axios
      .get("http://localhost:8081/api/Vehicle/brands")
      .then((response) => setBrands(response.data))
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  useEffect(() => {
    // Fetch models when brand is selected
    if (selectedBrand) {
      axios
        .get(`http://localhost:8081/api/Vehicle/models/${selectedBrand}`)
        .then((response) => setModels(response.data))
        .catch((error) => console.error("Error fetching models:", error));
    } else {
      setModels([]);
    }
  }, [selectedBrand]);

  useEffect(() => {
    // Fetch years when model is selected
    if (selectedModel) {
      axios
        .get(`http://localhost:8081/api/Vehicle/years/${selectedBrand}/${selectedModel}`)
        .then((response) => setYears(response.data))
        .catch((error) => console.error("Error fetching years:", error));
    } else {
      setYears([]);
    }
  }, [selectedModel, selectedBrand]);

  const handleSearch = () => {
    if (!selectedBrand || !selectedModel || !selectedYear) {
      alert("Please select brand, model, and year.");
      return;
    }

    // Fetch the estimated value for the selected vehicle
    axios
      .get(
        `http://localhost:8081/api/Vehicle/estimatedValue/${selectedBrand}/${selectedModel}/${selectedYear}`
      )
      .then((response) => setMaxLeasingAmount(response.data))
      .catch((error) => console.error("Error fetching estimated value:", error));
  };

  const handleCalculate = () => {
    const principal = parseFloat(leasingAmount);
    const months = parseFloat(timePeriod);
    const rate = parseFloat(interestRate) / 100 / 12;

    if (isNaN(principal) || isNaN(months) || isNaN(rate)) {
      alert("Please enter valid numbers");
      return;
    }

    const installment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    setMonthlyInstallment(installment.toFixed(2));
  };

  return (
   
    <div className="pb-24" id = "carlist">
      <div className="container mx-auto max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3 text-center">
          Leasing Calculators
        </h1>
        <p className="text-sm pb-10 text-center">
          Use the calculators to find the maximum leasing amount or calculate your monthly installment.
        </p>

        <div className="mb-8 flex space-x-4 justify-center">
          <button
            onClick={() => setActiveCalculator("maximum")}
            className={`py-2 px-4 rounded-md ${activeCalculator === "maximum" ? "bg-primary text-black" : "bg-gray-300"}`}
          >
            Maximum Leasing Calculator
          </button>
          <button
            onClick={() => setActiveCalculator("leasing")}
            className={`py-2 px-4 rounded-md ${activeCalculator === "leasing" ? "bg-primary text-black" : "bg-gray-300"}`}
          >
            Leasing Calculator
          </button>
        </div>

        {/* Maximum Leasing Calculator */}
        {activeCalculator === "maximum" && (
          <div className="p-6 bg-black rounded-md shadow-md">
            <div className="mb-8">
              <label className="block text-xl font-medium mb-2 text-yellow-500" htmlFor="brand">
                Select Vehicle Brand
              </label>
              <select
                id="brand"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setSelectedModel(""); // Reset model when brand changes
                }}
              >
                <option value="">Select a brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-xl font-medium mb-2 text-yellow-500" htmlFor="model">
                Select Vehicle Model
              </label>
              <select
                id="model"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={!selectedBrand}
              >
                <option value="">Select a model</option>
                {selectedBrand &&
                  models.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-xl font-medium mb-2 text-yellow-500" htmlFor="year">
                Select Manufacturing Year
              </label>
              <select
                id="year"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                disabled={!selectedModel}
              >
                <option value="">Select a year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-8">
              <button
                onClick={handleSearch}
                className="w-full py-2 px-4 bg-primary text-black rounded-md hover:bg-primary/80 transition duration-300"
                disabled={!selectedBrand || !selectedModel || !selectedYear}
              >
                Search
              </button>
            </div>

            {maxLeasingAmount !== null && (
              <div className="block text-xl font-medium mb-2 text-yellow-500" htmlFor="leasing-amount">
                <h2 className="text-xl font-semibold text-center">
                  Maximum Leasing Amount: Rs{maxLeasingAmount}
                </h2>
              </div>
            )}
          </div>
        )}

        {/* Leasing Calculator */}
        {activeCalculator === "leasing" && (
          <div className="p-6 bg-white rounded-md shadow-md">
            <div className="mb-8">
              <label className="block text-xl font-medium mb-2 text-yellow-500" htmlFor="leasing-amount">
                Enter Requested Leasing Amount
              </label>
              <input
                type="number"
                id="leasing-amount"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                value={leasingAmount}
                onChange={(e) => setLeasingAmount(e.target.value)}
              />
            </div>

            <div className="mb-8">
              <label className="block text-xl font-medium mb-2 text-yellow-500" htmlFor="time-period">
                Enter Time Period (Months)
              </label>
              <input
                type="number"
                id="time-period"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
              />
            </div>

            <div className="mb-8">
              <label className="block text-xl font-medium mb-2 text-yellow-500" htmlFor="interest-rate">
                Enter Interest Rate (% per annum)
              </label>
              <input
                type="number"
                id="interest-rate"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-500"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>

            <div className="mb-8">
              <button
                onClick={handleCalculate}
                className="w-full py-2 px-4 bg-primary text-black rounded-md hover:bg-primary/80 transition duration-300"
              >
                Calculate
              </button>
            </div>

            {monthlyInstallment !== null && (
              <div className="block text-xl font-medium mb-2 text-yellow-500" htmlFor="leasing-amount">
                <h2 className="text-xl font-semibold text-center">
                  Monthly Installment: Rs{monthlyInstallment}
                </h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;
