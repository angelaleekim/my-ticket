import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import EventsSection from "../components/EventsSection";

const Home = ({ authToken, setAuthToken }) => {
  return (
    <div className="pt-16 h-full">
      <Navbar authToken={authToken} setAuthToken={setAuthToken} />
      <HeroSection authToken={authToken} setAuthToken={setAuthToken} />
      <EventsSection authToken={authToken} />
    </div>
  );
};

export default Home;
