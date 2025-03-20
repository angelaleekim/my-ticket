import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import EventDetailsModal from "../components/EventDetailsModal";
import { Link } from "react-router-dom";

const Bookings = ({ authToken }) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailsBooking, setDetailsBooking] = useState(null);

  useEffect(() => {
    if (!authToken) return;

    // Fetch booked events from the API
    fetch("http://localhost:3000/api/events/booked", {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch booked events");
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching booked events:", error);
        setIsLoading(false);
      });
  }, [authToken]);

  const handleCancelEvent = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/events/${eventId}/unbook`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }
      setBookings((prev) => prev.filter((booking) => booking._id !== eventId));
    } catch (error) {
      console.error("Error canceling booking:", error);
    } finally {
      setSelectedBooking(null);
    }
  };

  const confirmCancelEvent = (eventId) => {
    setSelectedBooking(bookings.find((booking) => booking._id === eventId));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <Navbar />
      <div className="flex justify-center h-[85vh] px-4 w-[60vw] flex-col">
        <h1 className="text-5xl my-10 font-bold text-left fw-900 outfit-font">
          Your Bookings
        </h1>
        {bookings.length === 0 ? (
          <p className="text-gray-600">You have no bookings yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4 justify-center">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="p-4 rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg hover:translate-y-[-2px] transition-transform"
                onClick={() => setDetailsBooking(booking)}
              >
                <h2 className="text-xl font-bold">{booking.name}</h2>
                <p className="text-gray-600">{booking.date}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmCancelEvent(booking._id);
                  }}
                  className="mt-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
        <Link
          to="/"
          className="mt-14 px-5 py-3 text-center bg-red-500 text-white rounded-xl w-40 hover:bg-red-600"
        >
          Back to Home
        </Link>
      </div>

      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onConfirm={async () => {
          await handleCancelEvent(selectedBooking._id);
          setSelectedBooking(null); // Ensure modal closes after action
        }}
      >
        <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
        <h3 className="modal">
          Are you sure you want to cancel the booking for{" "}
          {selectedBooking?.name}?
        </h3>
      </Modal>

      <EventDetailsModal
        isOpen={!!detailsBooking}
        onClose={() => setDetailsBooking(null)}
        event={detailsBooking}
        onBook={() => {}}
        onUnbook={async (eventId) => {
          confirmCancelEvent(eventId);
          setDetailsBooking(null); // Close the details modal
        }}
        isBooked={true}
      />
    </div>
  );
};

export default Bookings;
