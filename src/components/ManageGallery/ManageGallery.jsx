import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminGallery = () => {
  // State to manage the gallery data and form inputs
  const [galleryImages, setGalleryImages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch all gallery images when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/gallery")
      .then((response) => setGalleryImages(response.data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  // Handle Add Image
  const handleAddImage = async () => {
    if (!imageFile) {
      alert("Please choose an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post("http://localhost:8081/api/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setGalleryImages([...galleryImages, response.data]);
      setImageFile(null); // Reset the file input after adding
    } catch (error) {
      console.error("Error adding image:", error);
    }
  };

  // Handle Edit Image
  const handleEditImage = async () => {
    if (!selectedImage || !imageFile) {
      alert("Please select an image and choose a new file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.put(
        `http://localhost:8081/api/gallery/${selectedImage.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setGalleryImages(
        galleryImages.map((image) =>
          image.id === selectedImage.id ? response.data : image
        )
      );
      
      setImageFile(null); // Reset the file input after editing
      setSelectedImage(null); // Reset selected image
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  // Handle Delete Image
  const handleDeleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/gallery/${id}`);
      setGalleryImages(galleryImages.filter((image) => image.id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Handle selecting an image for editing
  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  // Handle View Image and display it in the container
 

  return (
    <div className="container mx-auto max-w-3xl mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">Manage Gallery</h1>

      {/* Image List */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Gallery Images</h2>
        <div className="grid grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="border p-4 rounded-md">
              <img
                src={`http://localhost:8081/api/gallery/download/${image.image}`}
                alt="Gallery"
                className="w-full h-40 object-cover mb-4"
              />
              <div className="text-center">
                <button  
                  onClick={() => handleSelectImage(image)}
                  className="py-1 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="py-1 px-4 bg-red-500 text-white rounded-md hover:bg-red-400 mr-2"
                >
                  Delete
                </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add or Edit Image Form */}
      <div className="p-6 bg-gray-100 rounded-md shadow-md">
        <h2 className="w-full p-2 mb-4   rounded-md text-black">
          {selectedImage ? "Edit Image" : "Add New Image"}
        </h2>
        <form>
          <div className="mb-4">
            <label className="w-full p-2 mb-4   rounded-md text-black" htmlFor="imageFile">
              Select Image
            </label>
            <input
              type="file"
              id="imageFile"
              className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-400"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
            />
          </div>

          <div className="text-center">
            {selectedImage ? (
              <button
                type="button"
                onClick={handleEditImage}
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-400"
              >
                Update Image
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAddImage}
                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-400"
              >
                Add Image
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Container for displaying selected image */}
      <div id="imageContainer" className="mt-6"></div>
    </div>
  );
};

export default AdminGallery;
