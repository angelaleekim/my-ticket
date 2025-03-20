import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ authToken, setAuthToken }) => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    navigate("/");
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="bg-red-500 p-4 flex justify-between items-center fixed top-0 w-full z-10">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-white font-bold text-2xl">
          MyTicket
        </Link>
        {authToken && (
          <button
            onClick={handleLogout}
            className="text-white font-semibold hover:bg-red-600 p-2 rounded-lg cursor-pointer"
          >
            Sign Out
          </button>
        )}
      </div>
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
          className="flex items-center text-white font-semibold hover:bg-red-600 p-2 rounded-lg cursor-pointer"
        >
          {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
