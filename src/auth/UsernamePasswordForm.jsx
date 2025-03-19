import React from "react";
import { useActionState } from "react";

export function UsernamePasswordForm({ onSubmit }) {
  const [result, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const submitResult = await onSubmit(formData);

      if (!submitResult || submitResult.type === "error") {
        return {
          type: "error",
          message: submitResult ? submitResult.message : "An error occurred.",
        };
      }

      return {
        type: "success",
        message: "You have successfully logged in!",
      };
    },
    null
  );

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
        <div style={{ marginBottom: "0.5rem" }}>
          <label htmlFor="username" style={{ marginRight: "0.5rem" }}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            disabled={isPending}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "0.2rem",
            }}
          />
        </div>
        <div style={{ marginBottom: "rem" }}>
          <label htmlFor="password" style={{ marginRight: "0.5rem" }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            disabled={isPending}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "0.2rem",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Submit
        </button>
      </form>
    </>
  );
}
