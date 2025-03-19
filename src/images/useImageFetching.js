import { useEffect, useState } from "react";

export function useImageFetching(authToken) {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedImages, setFetchedImages] = useState([]);

  useEffect(() => {
    if (!authToken) {
      setIsLoading(false);
      return;
    }

    fetch("/api/images", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFetchedImages(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setIsLoading(false);
      });
  }, [authToken]);

  return { isLoading, fetchedImages };
}
