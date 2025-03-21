import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    subject: "",
    name: "",
    contactNumber: "",
    email: "",
  });
  const [message, setMessage] = useState(""); // State for handling success or error message

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/api/inquiries", formData);

      if (response.status === 201) {
        setMessage("Inquiry submitted successfully!");
        // Optionally, reset the form after successful submission
        setFormData({
          subject: "",
          name: "",
          contactNumber: "",
          email: "",
        });
      }
    } catch (error) {
      setMessage("Error submitting the inquiry. Please try again.");
    }
  };

  return (
    <>
      <span id="contact"></span>
      <div data-aos="zoom-in" className="bg-white dark:bg-black dark:text-white py-10">
        <div className="container mx-auto">
          <div className="bg-gray-100 dark:bg-black p-6 rounded-lg max-w-md mx-auto shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 text-center">
              Fill in the form and we will call you back
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Subject Field */}
              <div>
                <label className="block text-gray-600 dark:text-gray-400 mb-1" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                  required
                />
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-gray-600 dark:text-gray-400 mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                  required
                />
              </div>

              {/* Contact Number Field */}
              <div>
                <label className="block text-gray-600 dark:text-gray-400 mb-1" htmlFor="contactNumber">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-600 dark:text-gray-400 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full py-3 px-5 bg-yellow-500 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Display Success or Error Message */}
            {message && (
              <p className={`text-center mt-4 ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
