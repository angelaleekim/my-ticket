import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import EventsSection from "../components/EventsSection";

const Home = () => {
  return (
    <div className="pt-16 h-full">
      <Navbar />
      <HeroSection />
      <EventsSection />
    </div>
  );
};

export default Home;
