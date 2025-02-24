import React from "react";

const events = [
  { id: 1, name: "Event 1", date: "2023-10-01" },
  { id: 2, name: "Event 2", date: "2023-10-05" },
  { id: 3, name: "Event 3", date: "2023-10-10" },
  { id: 4, name: "Event 4", date: "2023-10-15" },
  { id: 5, name: "Event 5", date: "2023-10-20" },
  { id: 6, name: "Event 6", date: "2023-10-25" },
  { id: 7, name: "Event 7", date: "2023-10-30" },
  { id: 8, name: "Event 8", date: "2023-11-05" },
  { id: 9, name: "Event 9", date: "2023-11-10" },
];

const Events = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-4 justify-center p-4">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{event.name}</h2>
            <p className="text-gray-600">{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
