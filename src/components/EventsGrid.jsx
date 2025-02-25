import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./LoadingDots.css";
import "./EventsGrid.css";

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

const EventsGrid = () => {
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookings, setBookings] = useState(() => {
    return JSON.parse(localStorage.getItem("bookings")) || [];
  });
  const [isCancel, setIsCancel] = useState(false);

  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleBookEvent = (event) => {
    setSelectedEvent(event);
    setIsCancel(false);
  };

  const handleCancelEvent = (event) => {
    setSelectedEvent(event);
    setIsCancel(true);
  };

  const confirmBooking = () => {
    const updatedBookings = [...bookings, selectedEvent];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setSelectedEvent(null);
  };

  const confirmCancel = () => {
    const updatedBookings = bookings.filter(
      (booking) => booking.id !== selectedEvent.id
    );
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setSelectedEvent(null);
  };

  const isBooked = (eventId) => {
    return bookings.some((booking) => booking.id === eventId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h2 className="text-xl font-bold">{event.name}</h2>
            <p className="text-gray-600">{event.date}</p>
            {isBooked(event.id) ? (
              <div className="flex flex-wrap space-x-3">
                <button
                  className="mt-2 px-4 bg-red-600 text-white rounded-lg flex items-center justify-center"
                  disabled
                >
                  <FaCheck className="mr-2" />
                  Booked
                </button>
                <button
                  onClick={() => handleCancelEvent(event)}
                  className="mt-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleBookEvent(event)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Book Event
              </button>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onConfirm={isCancel ? confirmCancel : confirmBooking}
      >
        <h2 className="text-xl font-bold mb-4">
          {isCancel ? "Confirm Cancellation" : "Confirm Booking"}
        </h2>
        <p>
          Are you sure you want to{" "}
          {isCancel ? "cancel the booking for" : "book"} {selectedEvent?.name}?
        </p>
      </Modal>
    </div>
  );
};

export default EventsGrid;
