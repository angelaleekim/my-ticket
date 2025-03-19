import { useImageFetching } from "./useImageFetching.js";
import { useParams } from "react-router";

export function ImageDetails(props) {
  const { imageId } = useParams();
  const { isLoading, fetchedImages } = useImageFetching(props.authToken);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const imageData = fetchedImages.find((image) => image.id === imageId);
  if (!imageData) {
    return (
      <div>
        <h2>Image not found</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>{imageData.name}</h2>
      <img
        className="ImageDetails-img"
        src={imageData.src}
        alt={imageData.name}
      />
    </div>
  );
}
