import React, { useState, useEffect } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";

export const Navlinks = [
  {
    id: 1,
    name: "Leasing Calculator",
    link: "/#carlist",
  },
  {
    id: 2,
    name: "About Us",
    link: "/#about",
  },
  {
    id: 3,
    name: "Contact us",
    link: "/#contact",
  },
  {
    id: 4,
    name: "Branches",
    link: "/#branch",
  },
];

const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true); // Change to false if no notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn"); // Check if the user is logged in
    if (loggedIn === 'true') {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleAuth = () => {
    if (isLoggedIn) {
      // Clear session and log out
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      setIsLoggedIn(false); // Update the state to reflect that the user is logged out
      navigate("/signin"); // Redirect to login page
    } else {
      navigate("/signin"); // Redirect to login page if not logged in
    }
  };

  const role = localStorage.getItem('role'); // Get role from localStorage

  const toggleUserOptions = () => {
    setShowUserOptions(!showUserOptions);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setHasNotifications(false);
  };

  return (
    <div className="relative z-10 shadow-md w-full dark:bg-black dark:text-white duration-300">
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <img src={logo} alt="logo" className="h-20" />
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {role !== 'staff' && role !== 'admin' && (
              <ul className="flex space-x-8">
                {Navlinks.map(({ id, name, link }) => (
                  <li key={id}>
                    <a
                      href={link}
                      className="text-xl font-medium hover:text-primary py-2 hover:border-b-4 hover:border-primary transition-colors duration-500"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {/* Sign In / Sign Out Button */}
            <button
              onClick={handleAuth}
              className="ml-4 py-2 px-4 bg-primary text-black rounded-md hover:bg-primary/80 transition duration-300"
            >
              {isLoggedIn ? "Sign Out" : "Sign In"}
            </button>
            
            {/* Notification Icon */}
            <div className="relative">
              {role && role !== 'staff' && role !== 'admin' && (
                <button
                  className={`ml-4 p-2 rounded-full ${hasNotifications ? 'bg-red-500' : 'bg-gray-300'}`}
                  onClick={handleNotificationClick}
                >
                  {hasNotifications ? (
                    <IoMdNotifications className="text-white text-2xl" />
                  ) : (
                    <IoMdNotificationsOutline className="text-white text-2xl" />
                  )}
                </button>
              )}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2">
                  <ul>
                    {role !== 'normal-user' && (
                      <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                        <Link to="/chat" onClick={() => navigate("/Chat")}>Chat</Link>
                      </li>
                    )}
                    {role !== 'customer' && (
                      <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                        <Link to="/confermation" onClick={() => navigate("/Confermation")}>Confirmation</Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* User Options */}
            {role && role !== 'normal-user' && role !== 'staff' && role !== 'admin' && (
              <div className="relative">
                <FaUserCircle
                  className="text-2xl ml-4 cursor-pointer"
                  onClick={toggleUserOptions}
                />
                {showUserOptions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                        <Link to="/payments" onClick={() => navigate("/Payments")}>Payments</Link>
                      </li>
                     
                      <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                        <Link to="/report" onClick={() => navigate("/Report")}>Report</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                        <Link to="/security" onClick={() => navigate("/Security")}>Security</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Dark Mode Toggle */}
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl ml-4"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl ml-4"
              />
            )}
          </nav>

          {/* Mobile View */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Dark Mode Toggle */}
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl"
              />
            )}

            {/* Mobile Hamburger Icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
