import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import EventDetailsModal from "./EventDetailsModal";
import { FaCheck } from "react-icons/fa";
import { useEventFetching } from "../hooks/useEventFetching";
import "./LoadingDots.css";
import "./EventsGrid.css";

const EventsGrid = ({ authToken }) => {
  const { events, isLoading, bookEvent, unbookEvent, bookedEvents, setEvents } =
    useEventFetching(authToken);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCancel, setIsCancel] = useState(false);
  const [detailsEvent, setDetailsEvent] = useState(null);

  const handleBookEvent = async (eventId) => {
    try {
      await bookEvent(eventId);
      setSelectedEvent(null); // Close the modal
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  const handleCancelEvent = async (eventId) => {
    try {
      await unbookEvent(eventId);
      setSelectedEvent(null); // Close the modal
    } catch (error) {
      console.error("Error canceling event:", error);
    }
  };

  const confirmCancelEvent = (eventId) => {
    setSelectedEvent(events.find((event) => event.id === eventId));
    setIsCancel(true);
  };

  const confirmBookEvent = (eventId) => {
    setSelectedEvent(events.find((event) => event.id === eventId));
    setIsCancel(false);
  };

  useEffect(() => {
    setEvents((prev) =>
      prev.map((event) => ({
        ...event,
        isBooked: bookedEvents.some(
          (bookedEvent) => bookedEvent._id === event.id
        ),
      }))
    );
  }, [bookedEvents, setEvents]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loading-dots">
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
          const isBooked = bookedEvents.some(
            (bookedEvent) => bookedEvent._id === event.id
          );
          return (
            <div
              key={event.id}
              className="event-card cursor-pointer hover:shadow-lg hover:translate-y-[-2px] transition-transform"
              onClick={() => setDetailsEvent(event)}
            >
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
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmCancelEvent(event.id);
                    }}
                    className="mt-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmBookEvent(event.id);
                  }}
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
        onConfirm={async () => {
          if (isCancel) {
            await handleCancelEvent(selectedEvent.id);
          } else {
            await handleBookEvent(selectedEvent.id);
          }
          setSelectedEvent(null); // Ensure modal closes after action
        }}
      >
        <h2 className="text-xl font-bold mb-4">
          {isCancel ? "Confirm Cancellation" : "Confirm Booking"}
        </h2>
        <h3 className="modal">
          Are you sure you want to{" "}
          {isCancel ? "cancel the booking for" : "book"} {selectedEvent?.name}?
        </h3>
      </Modal>

      <EventDetailsModal
        isOpen={!!detailsEvent}
        onClose={() => setDetailsEvent(null)}
        event={detailsEvent}
        onBook={async (eventId) => {
          confirmBookEvent(eventId);
          setDetailsEvent(null); // Close the details modal
        }}
        onUnbook={async (eventId) => {
          confirmCancelEvent(eventId);
          setDetailsEvent(null); // Close the details modal
        }}
        isBooked={
          detailsEvent && bookedEvents.some((e) => e._id === detailsEvent.id)
        }
      />
    </div>
  );
};

export default EventsGrid;
