import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

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

  return (
    <nav className="bg-red-500 p-4 flex justify-between items-center fixed top-0 w-full z-10">
      <div className="flex space-x-4">
        <Link
          to="/bookings"
          className="text-white font-semibold hover:bg-red-600 p-2 rounded-lg"
        >
          Your Bookings
        </Link>
        <Link
          to="/events"
          className="text-white font-semibold hover:bg-red-600 p-2 rounded-lg"
        >
          All Events
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-lg border border-gray-200 bg-white focus:outline-none"
        />
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
