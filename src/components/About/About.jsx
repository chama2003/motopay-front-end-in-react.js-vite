import React from "react";
import { useNavigate } from "react-router-dom";
import CarPng from "../../assets/car1.png";

const About = () => {
  const navigate = useNavigate();



  return (
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={CarPng}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About the leasing marketplace
              </h1>
          
                <h1>WELCOME TO LEASING MARKET</h1>
                <p>Leasing Market is the first online service for purchasing cars on lease. The marketplace was developed by VTB Leasing, one of the largest universal leasing companies in Russia. We are part of the corporate and investment business of the VTB Group and create the best financial solutions for you.</p>
                <p>After simple registration, you will receive a personal calculation for any car presented in the catalog on the terms of your choice. The entire transaction, from choosing a car to signing the contract, will take place online in electronic digital format</p>
             
              <button
                data-aos="fade-up"
                className="button-outline"
                onClick={() => navigate("/gallery")}
              >
                Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;