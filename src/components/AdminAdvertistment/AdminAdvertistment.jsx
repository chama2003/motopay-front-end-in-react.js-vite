import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminAdvertisement = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [selectedAdvertisement, setSelectedAdvertisement] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(""); // For viewing the image in modal

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/advertisements")
      .then((response) => setAdvertisements(response.data))
      .catch((error) => console.error("Error fetching advertisements:", error));
  }, []);

  // Handle adding a new advertisement
  const handleAddAdvertisement = () => {
    if (!image) {
      alert("Please choose an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    axios
      .post("http://localhost:8081/api/advertisements", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setAdvertisements([...advertisements, response.data]);
        setTitle("");
        setDescription("");
        setImage(null);
      })
      .catch((error) => console.error("Error adding advertisement:", error));
  };

  // Handle selecting an advertisement for editing
  const handleSelectAdvertisement = (advertisement) => {
    setSelectedAdvertisement(advertisement);
    setTitle(advertisement.title);
    setDescription(advertisement.description);
    setImage(advertisement.image);
  };

  // Handle updating an advertisement
  const handleUpdateAdvertisement = () => {
    if (!selectedAdvertisement || !image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    axios
      .put(
        `http://localhost:8081/api/advertisements/${selectedAdvertisement.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setAdvertisements(
          advertisements.map((advertisement) =>
            advertisement.id === selectedAdvertisement.id
              ? response.data
              : advertisement
          )
        );
        setSelectedAdvertisement(null);
        setTitle("");
        setDescription("");
        setImage(null);
      })
      .catch((error) => console.error("Error updating advertisement:", error));
  };

  // Handle deleting an advertisement
  const handleDeleteAdvertisement = (id) => {
    axios
      .delete(`http://localhost:8081/api/advertisements/${id}`)
      .then(() => {
        setAdvertisements(advertisements.filter((ad) => ad.id !== id));
      })
      .catch((error) => console.error("Error deleting advertisement:", error));
  };

  // Handle viewing the image
  

  // Close the modal
  const closeModal = () => {
    setSelectedImageUrl(""); // Close the modal
  };

  return (
    <div className="container mx-auto max-w-3xl mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">Manage Advertisements</h1>

      {/* Add/Edit Advertisement Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {selectedAdvertisement ? "Edit Advertisement" : "Add New Advertisement"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-400"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br/>
        <br/>
        <div className="text-center">
          {selectedAdvertisement ? (
            <button
              onClick={handleUpdateAdvertisement}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-400"
            >
              Update Advertisement
            </button>
          ) : (
            <button
              onClick={handleAddAdvertisement}
              className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-400"
            >
              Add Advertisement
            </button>
          )}
        </div>
      </div>

      {/* List of Advertisements */}
      <h2 className="text-2xl font-semibold mb-4">All Advertisements</h2>
      <div className="grid grid-cols-3 gap-4">
        {advertisements.map((ad) => (
          <div key={ad.id} className="border p-4 rounded-md">
            <h3 className="font-semibold">{ad.title}</h3>
            <p>{ad.description}</p>
            <img
              src={`http://localhost:8081/api/advertisements/download/${ad.image}`}
              alt={ad.title}
              className="w-full h-40 object-cover mb-4 cursor-pointer"
              // Click to view the image in the modal
            />
            <div className="text-center">
              <button
                onClick={() => handleSelectAdvertisement(ad)}
                className="py-1 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteAdvertisement(ad.id)}
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
            <img src={selectedImageUrl} alt="Advertisement" className="max-w-full max-h-80" />
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

export default AdminAdvertisement;
