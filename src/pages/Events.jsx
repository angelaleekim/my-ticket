import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Events = () => {
  return (
    <div className="flex justify-center items-center">
      <Navbar />
      <div className="flex justify-center h-[85vh] px-4 md:px-[20vw] flex-col">
        <h1 className="text-5xl font-bold text-left fw-900 outfit-font">
          Events
        </h1>
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

export default Events;
