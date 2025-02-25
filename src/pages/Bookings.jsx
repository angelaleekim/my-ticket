import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <Navbar />
      <div className="flex justify-center h-[85vh] px-4 w-[60vw] flex-col">
        <h1 className="text-5xl my-10 font-bold text-left fw-900 outfit-font">
          Your Bookings
        </h1>
        <div className="grid grid-cols-3 gap-4 justify-center">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 rounded-xl shadow-md border border-gray-200"
            >
              <h2 className="text-xl font-bold">{booking.name}</h2>
              <p className="text-gray-600">{booking.date}</p>
            </div>
          ))}
        </div>
        <Link
          to="/"
          className="mt-14 px-5 py-3 text-center bg-red-500 text-white rounded-xl w-40 hover:bg-red-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Bookings;
