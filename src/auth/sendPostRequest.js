export async function sendPostRequest(url, payload) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200 || response.status === 201) {
      const data = await response.json();
      return {
        type: "success",
        message:
          response.status === 200
            ? "You have successfully logged in!"
            : "You have successfully registered!",
        token: data.token,
      };
    } else if (response.status === 400) {
      return {
        type: "error",
        message: "Missing username or password.",
      };
    } else if (response.status === 401) {
      return {
        type: "error",
        message: "Incorrect username or password.",
      };
    } else if (response.status === 500) {
      return {
        type: "error",
        message: "Server error. Please try again later.",
      };
    }

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (error) {
    throw error;
  }
}
