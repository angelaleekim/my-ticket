import React from "react";
import EventsGrid from "./EventsGrid";

const EventsSection = ({ authToken }) => {
  return (
    <section className="flex justify-center">
      <div className="container p-14 mt-14 h-[85vh]">
        <h2 className="text-4xl font-semibold my-7">Upcoming Events</h2>
        <EventsGrid authToken={authToken} />
      </div>
    </section>
  );
};

export default EventsSection;
