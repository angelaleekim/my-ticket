import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ authToken }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="bg-red-500 p-4 flex justify-between items-center fixed top-0 w-full z-10">
      <Link to="/" className="text-white font-bold text-2xl">
        MyTicket
      </Link>
      <div className="flex items-center space-x-4">
        {!isAuthPage && (
          <>
            <Link
              to="/bookings"
              className="text-white font-semibold hover:bg-red-600 p-2 rounded-lg"
            >
              My Bookings
            </Link>
            <Link
              to="/events"
              className="text-white font-semibold hover:bg-red-600 p-2 rounded-lg"
            >
              All Events
            </Link>
          </>
        )}
        <button
          onClick={toggleDarkMode}
          className="flex items-center text-white font-semibold hover:bg-red-600 p-2 rounded-lg"
        >
          {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
