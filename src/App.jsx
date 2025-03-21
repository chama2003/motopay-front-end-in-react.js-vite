"use client"; // Mark this as a client component

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Component imports
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import CarList from "./components/CarList/CarList";
import AppStoreBanner from "./components/AppStoreBanner/AppStoreBanner";
import Contact from "./components/Contact/Contact";
import Testimonial from "./components/Testimonial/Testimonial";
import Footer from "./components/Footer/Footer";
import OnlineApplication from "./components/OnlineApplication/OnlineApplication";
import Payments from "./components/Payments/Payments";
import Report from "./components/Report/Report";
import Security from "./components/Security/Security";
import SignIn from "./components/SignIn/SignIn";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Gallery from "./components/Gallery/Galllery";
import Staff from "./components/Staff/Staff";
import Admin from "./components/Admin/Admin";
import BlogPost from "./components/BlogPost/BlogPost";
import Addvertistment from "./components/Addvertistment/Addvertistment";
import Paynow from "./components/Paynow/Paynow";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import AdminBlogPost from "./components/AdminBlogPost/AdminBlogPost";
import AdminAdvertistment from "./components/AdminAdvertistment/AdminAdvertistment";
import ManageTestimonials from "./components/ManageTestimonials/ManageTestimonials";
import ManageGallery from "./components/ManageGallery/ManageGallery";
import AdminPayment from "./components/AdminPayment/AdminPayment";
import EditCustomer from "./components/EditCustomer/EditCustomer";
import Chat from "./components/Chat/Chat";
import Confermation from "./components/Confermation/Confermation";
import AddPayment from "./components/AdminPayment/AddPayment";
import ManageMaximum from "./components/ManageMaximum/ManageMaximum"
import ManageStaff from "./components/ManageStaff/ManageStaff"
import ViewPayment from "./components/ViewPayent/ViewPayment"
import ManageQuary from "./components/ManageQuary/ManageQuary"
import ManageCustomer from "./components/ManageCustomer/ManageCustomer"
import ManageUser from "./components/ManageUser/ManageUser"
const App = () => {
  // Dark mode functionality
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Added isLoggedIn state
  const element = document.documentElement;

  console.log(isLoggedIn);
  const role = localStorage.getItem('role'); 
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      <Router>
        <Navbar theme={theme} setTheme={setTheme} />

        {/* Defining Routes */}
        <Routes>
          {/* Home Page Route (Wrapper Component) */}
          <Route
            path="/"
            element={
              <>
                <Hero theme={theme} />
                <About />
                <Services />
                {role !== 'customer' && (
                <CarList />)}
                <BlogPost />
                <Testimonial />
                <AppStoreBanner />
                <Addvertistment />
                {role !== 'customer' && (
                <Contact />)}
              </>
            }
          />

          {/* Online Application Page Route */}
          <Route path="/OnlineApplication" element={<OnlineApplication />} />
          <Route path="/Payments" element={<Payments />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/Security" element={<Security />} />
          <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} /> {/* Pass setIsLoggedIn */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/paynow" element={<Paynow />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/adminblogpost" element={<AdminBlogPost />} />
          <Route path="/adminadvertistment" element={<AdminAdvertistment />} />
          <Route path="/managegallery" element={<ManageGallery />} />
          <Route path="/viewpayment" element={<ViewPayment />} />
          <Route path="/managetestimonials" element={<ManageTestimonials />} />
          <Route path="/AdminPayment/:user_username" element={<AdminPayment />} />
          <Route path="/addpayment/:customerUsername" element={<AddPayment />} />
          <Route path="/editcustomer" element={<EditCustomer />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/managequary" element={<ManageQuary />} />
          <Route path="/confermation" element={<Confermation />} />
          <Route path="/managevehicle" element={<ManageMaximum />} />
          <Route path="/managestaff" element={<ManageStaff />} /> 
          <Route path="/managecustomer" element={<ManageCustomer />} />
       
          <Route path="/manageuser" element={<ManageUser />} />
          
        </Routes>
        {role !=='staff' && role !=='admin' &&(
        <Footer />)}
      </Router>
    </div>
  );
};

export default App;
