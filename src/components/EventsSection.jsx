import React from "react";
import Events from "./Events";

const EventsSection = () => {
  return (
    <section className="flex justify-center">
      <div className="container p-14 mt-14">
        <h2 className="text-4xl my-7">Upcoming Events</h2>
        <Events />
      </div>
    </section>
  );
};

export default EventsSection;
