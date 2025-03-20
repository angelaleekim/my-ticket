import React from "react";

const EventDetailsModal = ({
  isOpen,
  onClose,
  event,
  onBook,
  onUnbook,
  isBooked,
}) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400/20">
      <div className="bg-white p-6 rounded-2xl text-black shadow-xl border border-gray-200">
        <h2 className="text-xl font-bold mb-4">{event.name}</h2>
        <p className="mb-4">{event.description}</p>
        <p className="mb-4 text-gray-600">Date: {event.date}</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
          {isBooked ? (
            <button
              onClick={() => onUnbook(event.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Unbook
            </button>
          ) : (
            <button
              onClick={() => onBook(event.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Book
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
