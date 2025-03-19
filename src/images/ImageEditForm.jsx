import { useState } from "react";

export function ImageEditForm() {
    const [imageId, setImageId] = useState("");
    const [imageName, setImageName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/images/${imageId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: imageName }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Handle success response if needed
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        } finally {
            setImageId("");
            setImageName("");
            setIsLoading(false);
        }
    }

    return (
        <div style={{ padding: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
                Image ID
                <input
                        value={imageId}
                        disabled={isLoading}
                        onChange={(e) => setImageId(e.target.value)}
                        style={{ marginLeft: "8px" }}
                />
            </label>
            <label style={{ display: "block", marginBottom: "8px" }}>
                New image name
                <input
                        value={imageName}
                        disabled={isLoading}
                        onChange={(e) => setImageName(e.target.value)}
                        style={{ marginLeft: "8px" }}
                />
            </label>
            <button onClick={handleSubmit} disabled={isLoading}>Send request</button>
        </div>
    );
}
