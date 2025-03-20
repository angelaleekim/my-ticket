import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

const Welcome = ({ setAuthToken }) => {
  return (
    <div className="pt-16 h-full">
      <Navbar authToken={null} setAuthToken={setAuthToken} />
      <HeroSection authToken={null} setAuthToken={setAuthToken} />
    </div>
  );
};

export default Welcome;
