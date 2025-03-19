import { Link } from "react-router";
import "./ImageGallery.css";
import { ImageUploadForm } from "./ImageUploadForm";

export function ImageGallery({ isLoading, fetchedImages, authToken }) {
  const imageElements = fetchedImages.map((image) => (
    <div key={image.id} className="ImageGallery-photo-container">
      <Link to={"/images/" + image.id}>
        <img src={image.src} alt={image.name} />
      </Link>
    </div>
  ));
  return (
    <div className="outer-div">
      <h2>Image Gallery</h2>
      {isLoading && "Loading..."}
      <div className="ImageGallery">{imageElements}</div>
      <h3>Upload a New Image</h3>
      <ImageUploadForm authToken={authToken} />
    </div>
  );
}
