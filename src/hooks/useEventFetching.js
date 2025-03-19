import { useEffect, useState } from "react";

export function useEventFetching(authToken) {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    if (!authToken) {
      console.log("No auth token provided, skipping fetch.");
      setIsLoading(false);
      return;
    }

    // Fetch all events
    fetch("http://localhost:3000/api/events", {
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setIsLoading(false);
      });

    // Fetch booked events
    fetch("http://localhost:3000/api/events/booked", {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch booked events");
        }
        return response.json();
      })
      .then((data) => setBookedEvents(data))
      .catch((error) => console.error("Error fetching booked events:", error));
  }, [authToken]);

  const bookEvent = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/events/${eventId}/book`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      setBookedEvents((prev) => [...prev, { _id: eventId }]);
      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId ? { ...event, isBooked: true } : event
        )
      );
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  const unbookEvent = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/events/${eventId}/unbook`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      setBookedEvents((prev) => prev.filter((bookedEvent) => bookedEvent._id !== eventId));
      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId ? { ...event, isBooked: false } : event
        )
      );
    } catch (error) {
      console.error("Error unbooking event:", error);
    }
  };

  return { isLoading, events, bookedEvents, bookEvent, unbookEvent, setEvents };
}
