import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [message, setMessage] = useState(""); // For displaying success or error messages

  // Fetch all inquiries when the component mounts
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/inquiries");
        setInquiries(response.data); // Set the fetched inquiries
      } catch (error) {
        setMessage("Error fetching inquiries");
      }
    };

    fetchInquiries();
  }, []);

  // Handle the delete request
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/inquiries/${id}`);
      setInquiries(inquiries.filter(inquiry => inquiry.id !== id)); // Remove the deleted inquiry from the list
      setMessage("Inquiry deleted successfully");
    } catch (error) {
      setMessage("Error deleting the inquiry");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-black dark:text-white py-10">
      <div className="container mx-auto px-6">
        <div className="bg-gray-100 dark:bg-black p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 text-center">
            Inquiries
          </h1>
          {message && (
            <p className={`text-center mb-4 ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
              {message}
            </p>
          )}

          {/* Table displaying the list of inquiries */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-center table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Contact Number</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td className="border px-4 py-2">{inquiry.subject}</td>
                    <td className="border px-4 py-2">{inquiry.name}</td>
                    <td className="border px-4 py-2">{inquiry.contactNumber}</td>
                    <td className="border px-4 py-2">{inquiry.email}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDelete(inquiry.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Already contacted 
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;
