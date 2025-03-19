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
  }, [authToken]);

  const bookEvent = (eventId) => {
    fetch(`http://localhost:3000/api/events/${eventId}/book`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        setBookedEvents((prev) => [...prev, { id: eventId }]);
      })
      .catch((error) => {
        console.error("Error booking event:", error);
      });
  };

  const unbookEvent = (eventId) => {
    fetch(`http://localhost:3000/api/events/${eventId}/unbook`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        setBookedEvents((prev) => prev.filter((event) => event.id !== eventId));
      })
      .catch((error) => {
        console.error("Error unbooking event:", error);
      });
  };

  return { isLoading, events, bookedEvents, bookEvent, unbookEvent };
}
