import React from "react";
import { Link } from "react-router-dom";

const HeroSection = ({ authToken, setAuthToken }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="hero-section flex justify-center h-[85vh] px-4 md:px-[20vw] flex-col">
        <h1 className="text-4xl md:text-7xl font-bold text-left bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent leading-relaxed fw-900 outfit-font">
          MyTicket
        </h1>
        <p className="text-lg md:text-2xl text-left mt-4 text-gray-700 outfit-font max-w-full md:max-w-[70%]">
          Simplify and optimize your ticket booking experience for concerts,
          conferences, and sports matches.
        </p>
        {!authToken && (
          <div className="flex flex-col items-start mt-10">
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() =>
                  setAuthToken(
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld3VzZXIyIiwiaWF0IjoxNzQyNDQ0NTA2LCJleHAiOjE3NDI1MzA5MDZ9.8Umg0hmZhTPZuKhbA2YqySk2PDbkkXb0l_t3nRzBwAs"
                  )
                }
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:cursor-pointer"
              >
                Demo
              </button>
              <Link
                to="/login"
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:cursor-pointer"
              >
                Login
              </Link>
            </div>
            <p className="mt-4 text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500">
                Create an account
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
