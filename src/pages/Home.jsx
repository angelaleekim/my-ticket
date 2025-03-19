import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import EventsSection from "../components/EventsSection";

const Home = ({ authToken }) => {
  return (
    <div className="pt-16 h-full">
      <Navbar />
      <HeroSection />
      <EventsSection authToken={authToken} />
    </div>
  );
};

export default Home;
