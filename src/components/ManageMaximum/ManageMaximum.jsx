import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  // State to manage vehicle data and form inputs
  const [vehicles, setVehicles] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [manufacturingYear, setManufacturingYear] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Fetch all vehicles on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/Vehicle")
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  // Handle Add Vehicle
  const handleAddVehicle = () => {
    const newVehicle = {
      make,
      model,
      manufacturingYear,
      estimatedValue,
    };

    axios
      .post("http://localhost:8081/api/Vehicle", newVehicle)
      .then((response) => {
        setVehicles([...vehicles, response.data]);
        resetForm();
      })
      .catch((error) => console.error("Error adding vehicle:", error));
  };

  // Handle Update Vehicle
  const handleUpdateVehicle = () => {
    if (selectedVehicle) {
      const updatedVehicle = {
        make,
        model,
        manufacturingYear,
        estimatedValue,
      };

      axios
        .put(`http://localhost:8081/api/Vehicle/${selectedVehicle.id}`, updatedVehicle)
        .then((response) => {
          setVehicles(
            vehicles.map((vehicle) =>
              vehicle.id === selectedVehicle.id ? response.data : vehicle
            )
          );
          resetForm();
        })
        .catch((error) => console.error("Error updating vehicle:", error));
    }
  };

  // Handle Delete Vehicle
  const handleDeleteVehicle = (id) => {
    axios
      .delete(`http://localhost:8081/api/Vehicle/${id}`)
      .then(() => {
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
      })
      .catch((error) => console.error("Error deleting vehicle:", error));
  };

  // Reset form fields
  const resetForm = () => {
    setMake("");
    setModel("");
    setManufacturingYear("");
    setEstimatedValue("");
    setSelectedVehicle(null);
  };

  // Handle selecting a vehicle to update
  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setMake(vehicle.make);
    setModel(vehicle.model);
    setManufacturingYear(vehicle.manufacturingYear);
    setEstimatedValue(vehicle.estimatedValue);
  };

  return (
    <div className="container mx-auto max-w-lg mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">Admin Panel</h1>

      {/* Vehicle Form (Add or Update) */}
      <div className="p-6 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-black">
          {selectedVehicle ? "Update Vehicle" : "Add New Vehicle"}
        </h2>
        <form>
          <div className="mb-4">
            <label className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black" htmlFor="make">
              Vehicle Make
            </label>
            <input
              type="text"
              id="make"
              className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black" htmlFor="model">
              Vehicle Model
            </label>
            <input
              type="text"
              id="model"
              className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black" htmlFor="year">
              Manufacturing Year
            </label>
            <input
              type="number"
              id="year"
              className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
              value={manufacturingYear}
              onChange={(e) => setManufacturingYear(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black" htmlFor="estimatedValue">
              Estimated Value
            </label>
            <input
              type="number"
              id="estimatedValue"
              className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
              value={estimatedValue}
              onChange={(e) => setEstimatedValue(e.target.value)}
              required
            />
          </div>

          <div className="text-center">
            {selectedVehicle ? (
              <button
                type="button"
                onClick={handleUpdateVehicle}
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-400"
              >
                Update Vehicle
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAddVehicle}
                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-400"
              >
                Add Vehicle
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Vehicle List */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Vehicles List</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Make</th>
              <th className="border px-4 py-2">Model</th>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Estimated Value</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="border px-4 py-2">{vehicle.make}</td>
                <td className="border px-4 py-2">{vehicle.model}</td>
                <td className="border px-4 py-2">{vehicle.manufacturingYear}</td>
                <td className="border px-4 py-2">Rs{vehicle.estimatedValue}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleSelectVehicle(vehicle)}
                    className="py-1 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="py-1 px-4 bg-red-500 text-white rounded-md hover:bg-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
