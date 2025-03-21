import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";

const skillsData = [
  {
    id: 1,
    name: "Who We Are",
    icon: <FaCameraRetro className="text-5xl text-primary group-hover:text-black duration-300" />,
    link: "#",
    description: `At MotoPay, we are revolutionizing the vehicle leasing industry by making the process simple, 
    transparent, and convenient. Our mission is to provide customers with a seamless leasing experience, empowering them 
    to choose the right vehicle and flexible payment options that fit their lifestyle.`,
    aosDelay: "0",
  },

  {
    id: 2,
    name: "Our Vision",
    icon: <GiNotebook className="text-5xl text-primary group-hover:text-black duration-300" />,
    link: "#",
    description: `To become the leading vehicle leasing platform by offering innovative digital solutions that enhance 
    customer satisfaction and redefine the leasing experience.`,
    aosDelay: "500",
  },

  {
    id: 3,
    name: "Our Mission",
    icon: <SlNote className="text-5xl text-primary group-hover:text-black duration-500" />,
    link: "#",
    description: `To provide a user-friendly, secure, and efficient leasing platform that caters to the needs of both 
    customers and leasing companies, ensuring hassle-free transactions and transparent communication.`,
    aosDelay: "1000",
  },
];

const Services = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
          {/* Section Heading */}
          <div className="pb-12">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              Why Choose Us
            </h1>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skillsData.map((skill) => (
              <div
                key={skill.id}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
              >
                {/* Icon */}
                <div className="grid place-items-center">{skill.icon}</div>

                {/* Service Name */}
                <h1 className="text-2xl font-bold">{skill.name}</h1>

                {/* Description */}
                <p>{skill.description}</p>

                
                <a
                  href={skill.link}
                  className="inline-block text-lg font-semibold py-3 text-primary group-hover:text-black duration-300"
                >
                 
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
