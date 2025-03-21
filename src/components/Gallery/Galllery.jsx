import React, { useState, useEffect } from "react";
import axios from "axios";

const GalleryView = () => {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch all images when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/gallery");
        setImages(response.data);
      } catch (error) {
        setMessage("Error fetching images.");
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-black-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-yellow-500 mb-8">
        Gallery
      </h1>

      {message && <p className="text-center text-red-500 mb-4">{message}</p>}

     
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={`http://localhost:8081/api/gallery/download/${image.image}`}
                alt="gallery"
                className="w-full h-48 object-cover rounded-md transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-yellow-500 mt-4">No images available.</p>
      )}
    </div>
  );
};

export default GalleryView;
