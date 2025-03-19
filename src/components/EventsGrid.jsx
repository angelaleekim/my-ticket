import React, { useState } from "react";
import Modal from "./Modal";
import { FaCheck } from "react-icons/fa";
import { useEventFetching } from "../hooks/useEventFetching";
import "./LoadingDots.css";
import "./EventsGrid.css";

const EventsGrid = ({authToken}) => {
  const { events, bookedEvents, isLoading, bookEvent, unbookEvent } =
    useEventFetching(authToken);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCancel, setIsCancel] = useState(false);

  const handleBookEvent = (event) => {
    setSelectedEvent(event);
    setIsCancel(false);
  };

  const handleCancelEvent = (event) => {
    setSelectedEvent(event);
    setIsCancel(true);
  };

  const confirmAction = async () => {
    if (isCancel) {
      await unbookEvent(selectedEvent.id);
    } else {
      await bookEvent(selectedEvent.id);
    }
    setSelectedEvent(null);
  };

  if (isLoading) {
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
        {events.map((event) => {
          const isBooked = bookedEvents.some((e) => e.id === event.id);
          return (
            <div key={event.id} className="event-card">
              <h2 className="text-xl font-bold">{event.name}</h2>
              <p className="text-gray-600">{event.date}</p>
              {isBooked ? (
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
          );
        })}
      </div>

      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onConfirm={confirmAction}
      >
        <h2 className="text-xl font-bold mb-4">
          {isCancel ? "Confirm Cancellation" : "Confirm Booking"}
        </h2>
        <h3 className="modal">
          Are you sure you want to{" "}
          {isCancel ? "cancel the booking for" : "book"} {selectedEvent?.name}?
        </h3>
      </Modal>
    </div>
  );
};

export default EventsGrid;
