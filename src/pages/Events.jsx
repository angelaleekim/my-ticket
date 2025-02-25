import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import EventsSection from "../components/EventsSection";

const Events = () => {
  return (
    <div className="mt-20 pt-16 h-full">
      <Navbar />
      <div className="flex justify-center h-[85vh] px-4 md:px-[20vw] flex-col">
        <EventsSection />
      </div>
    </div>
  );
};

export default Events;
