import React from "react";

const HeroSection = () => {
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
      </div>
    </div>
  );
};

export default HeroSection;
