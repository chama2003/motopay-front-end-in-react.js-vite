import React, { useState, useEffect } from "react";
import axios from "axios";

const AdvertisementSection = () => {
  const [adsData, setAdsData] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch advertisements when the component mounts
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/advertisements");
        setAdsData(response.data);
      } catch (error) {
        setMessage("Error fetching advertisements.");
        console.error(error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="bg-black dark:bg-black dark:text-white py-14">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="pb-12">
          <h1 className="text-3xl font-semibold text-center sm:text-4xl text-yellow-500 font-serif">
            Latest Offers & Promotions
          </h1>
        </div>

        {/* Display Message if any error occurs */}
        {message && <p className="text-center text-yellow-500">{message}</p>}

        {/* Advertisement Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {adsData.map((ad) => (
            <div
              key={ad.id}
              className="group bg-black rounded-lg shadow-lg overflow-hidden hover:scale-105 transition duration-300"
            >
              {/* Image */}
              <img
                src={`http://localhost:8081/api/advertisements/download/${ad.image}`} // Backend image path
                alt={ad.title}
                className="w-full h-56 object-cover group-hover:opacity-80 transition duration-300"
              />

              {/* Content */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-white group-hover:text-yellow-500 transition duration-300">
                  {ad.title}
                </h2>
                <p className="text-gray-400 mt-2">{ad.description}</p>
                <a
                  href={ad.link || "#"}
                  className="text-yellow-500 mt-4 inline-block hover:underline"
                >
                  
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvertisementSection;
