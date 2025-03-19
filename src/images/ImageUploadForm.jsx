import React, { useState } from "react";
import { useId } from "react";
import { useActionState } from "react";

export function ImageUploadForm({ authToken }) {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputId = useId();

  const [result, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const imageFile = formData.get("image");
      const imageName = formData.get("name");

      if (!imageFile || !imageName) {
        return {
          type: "error",
          message: "Both image file and image name are required.",
        };
      }

      try {
        console.log("Auth Token:", authToken); // Check if token is being sent
        const response = await fetch("/api/images", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        return {
          type: "success",
          message: "Image uploaded successfully!",
        };
      } catch (error) {
        console.error(error);
        return {
          type: "error",
          message: "An error occurred while uploading the image.",
        };
      }
    },
    null
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <>
      {result && (
        <p
          className={`message ${
            result.type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {result.message}
        </p>
      )}
      {isPending && <p className="message loading">Loading ...</p>}
      <form action={submitAction}>
        <div style={{ marginBottom: "7px" }}>
          <label htmlFor={fileInputId}>Choose image to upload: </label>
          <input
            id={fileInputId}
            name="image"
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={handleImageChange}
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div>
          <label>
            <span>Image title: </span>
            <input name="name" style={{ marginLeft: "10px" }} />
          </label>
        </div>

        <div>
          <img
            style={{ maxWidth: "20em", margin: "10px 0" }}
            src={imagePreview}
            alt=""
          />
        </div>

        <button type="submit" disabled={isPending}>
          Confirm upload
        </button>
      </form>
    </>
  );
}
