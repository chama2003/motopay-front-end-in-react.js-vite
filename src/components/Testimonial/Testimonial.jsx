import React, { useState, useEffect } from "react";
import axios from "axios";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch all testimonials when the component mounts
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/testimonials");
        setTestimonials(response.data);
      } catch (error) {
        setMessage("Error fetching testimonials.");
        console.error(error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
        <div className="container">
          {/* Header */}
          <div className="space-y-4 pb-12">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              What Our Clients Say About Us
            </p>
           
          </div>

          {/* Display Message if any error occurs */}
          {message && <p className="text-center text-yellow-500">{message}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                data-aos="fade-up"
                data-aos-delay={testimonial.aosDelay || "0"}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-white/20 bg-gray-100 duration-300  rounded-lg "
              >
                <div className="grid place-items-center ">
                  <img
                    src={`http://localhost:8081/api/testimonials/download/${testimonial.image}`} // Backend image path
                    alt={testimonial.name}
                    className="rounded-full w-20 h-20"
                  />
                </div>
                <p>{testimonial.message}</p>
                <p className="text-center font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialSection;
