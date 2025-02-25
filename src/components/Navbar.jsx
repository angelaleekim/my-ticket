import React from "react";
import { Link } from "react-router-dom";
import { FaTicketAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-red-500 p-4 flex justify-between items-center fixed top-0 w-full z-10">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <FaTicketAlt className="w-10 h-10 mr-10 mx-3 text-white" />
        </Link>
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
      <input
        type="text"
        placeholder="Search..."
        className="p-2 rounded-lg border border-gray-200 bg-white focus:outline-none"
      />
    </nav>
  );
};

export default Navbar;
