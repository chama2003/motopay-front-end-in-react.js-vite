import React, { useState, useEffect } from "react";
import axios from "axios";

const StaffAdmin = () => {
  const [staffList, setStaffList] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/staff")
      .then((response) => setStaffList(response.data))
      .catch((error) => console.error("Error fetching staff:", error));
  }, []);

  // Handle adding a new staff member
  const handleAddStaff = () => {
    const newStaff = {
      username,
      password,
      role: "staff",  // Automatically assign role as 'staff'
    };

    axios
      .post("http://localhost:8081/api/staff", newStaff)
      .then((response) => {
        setStaffList([...staffList, response.data]);
        setUsername("");
        setPassword("");
      })
      .catch((error) => console.error("Error adding staff:", error));
  };

  // Handle selecting a staff member for editing
  const handleSelectStaff = (staff) => {
    setSelectedStaff(staff);
    setUsername(staff.username);
    setPassword(staff.password);
  };

  // Handle updating a staff member
  const handleUpdateStaff = () => {
    if (!selectedStaff) return;

    const updatedStaff = {
      username,
      password,
      role: selectedStaff.role, // Ensure the role remains the same during update
    };

    axios
      .put(`http://localhost:8081/api/staff/${selectedStaff.id}`, updatedStaff)
      .then((response) => {
        setStaffList(
          staffList.map((staff) =>
            staff.id === selectedStaff.id ? response.data : staff
          )
        );
        setSelectedStaff(null);
        setUsername("");
        setPassword("");
      })
      .catch((error) => console.error("Error updating staff:", error));
  };

  // Handle deleting a staff member
  const handleDeleteStaff = (id) => {
    axios
      .delete(`http://localhost:8081/api/staff/${id}`)
      .then(() => {
        setStaffList(staffList.filter((staff) => staff.id !== id));
      })
      .catch((error) => console.error("Error deleting staff:", error));
  };

  return (
    <div className="container mx-auto max-w-3xl mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">Manage Staff</h1>

      {/* Add/Edit Staff Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{selectedStaff ? "Edit Staff" : "Add New Staff"}</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center">
          {selectedStaff ? (
            <button
              onClick={handleUpdateStaff}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-400"
            >
              Update Staff
            </button>
          ) : (
            <button
              onClick={handleAddStaff}
              className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-400"
            >
              Add Staff
            </button>
          )}
        </div>
      </div>

      {/* List of Staff */}
      <h2 className="text-2xl font-semibold mb-4">All Staff</h2>
      <div className="grid grid-cols-3 gap-4">
        {staffList.map((staff) => (
          <div key={staff.id} className="border p-4 rounded-md">
            <h3 className="font-semibold">{staff.username}</h3>
            <div className="text-center">
              <button
                onClick={() => handleSelectStaff(staff)}
                className="py-1 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteStaff(staff.id)}
                className="py-1 px-4 bg-red-500 text-white rounded-md hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <br/><br/><br/>   <br/><br/><br/>   <br/><br/><br/>
    </div>
  );
};

export default StaffAdmin;
