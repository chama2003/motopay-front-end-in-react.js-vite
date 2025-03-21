import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(""); // For viewing the image in modal

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/testimonials")
      .then((response) => setTestimonials(response.data))
      .catch((error) => console.error("Error fetching testimonials:", error));
  }, []);

  // Handle adding a new testimonial
  const handleAddTestimonial = () => {
    if (!image) {
      alert("Please choose an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("message", message);

    axios
      .post("http://localhost:8081/api/testimonials", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setTestimonials([...testimonials, response.data]);
        setName("");
        setMessage("");
        setImage(null);
      })
      .catch((error) => console.error("Error adding testimonial:", error));
  };

  // Handle selecting a testimonial for editing
  const handleSelectTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setName(testimonial.name);
    setMessage(testimonial.message);
    setImage(testimonial.image);
  };

  // Handle updating a testimonial
  const handleUpdateTestimonial = () => {
    if (!selectedTestimonial || !image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("message", message);

    axios
      .put(
        `http://localhost:8081/api/testimonials/${selectedTestimonial.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setTestimonials(
          testimonials.map((testimonial) =>
            testimonial.id === selectedTestimonial.id
              ? response.data
              : testimonial
          )
        );
        setSelectedTestimonial(null);
        setName("");
        setMessage("");
        setImage(null);
      })
      .catch((error) => console.error("Error updating testimonial:", error));
  };

  // Handle deleting a testimonial
  const handleDeleteTestimonial = (id) => {
    axios
      .delete(`http://localhost:8081/api/testimonials/${id}`)
      .then(() => {
        setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id));
      })
      .catch((error) => console.error("Error deleting testimonial:", error));
  };

  // Handle viewing the image
  

  // Close the modal
  const closeModal = () => {
    setSelectedImageUrl(""); // Close the modal
  };

  return (
    <div className="container mx-auto max-w-3xl mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">Manage Testimonials</h1>

      {/* Add/Edit Testimonial Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {selectedTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Message"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="file"
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-400"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br/>
        
        <br/>
        <div className="text-center">
          {selectedTestimonial ? (
            <button
              onClick={handleUpdateTestimonial}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-400"
            >
              Update Testimonial
            </button>
          ) : (
            <button
              onClick={handleAddTestimonial}
              className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-400"
            >
              Add Testimonial
            </button>
          )}
        </div>
      </div>

      {/* List of Testimonials */}
      <h2 className="text-2xl font-semibold mb-4">All Testimonials</h2>
      <div className="grid grid-cols-3 gap-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border p-4 rounded-md">
            <h3 className="font-semibold">{testimonial.name}</h3>
            <p>{testimonial.message}</p>
            <img
              src={`http://localhost:8081/api/testimonials/download/${testimonial.image}`}
              alt={testimonial.name}
              className="w-full h-40 object-cover mb-4 cursor-pointer"
               // Click to view the image in the modal
            />
            <div className="text-center">
              <button
                onClick={() => handleSelectTestimonial(testimonial)}
                className="py-1 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTestimonial(testimonial.id)}
                className="py-1 px-4 bg-red-500 text-white rounded-md hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Viewing Image */}
      {selectedImageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg relative">
            <img src={selectedImageUrl} alt="Testimonial" className="max-w-full max-h-80" />
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-full"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonial;
