import React from "react";
import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "./sendPostRequest";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { Link } from "react-router";

export function RegisterPage({ onRegisterSuccess }) {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    console.log("Attempting to register with:", { username, password });
    try {
      const response = await sendPostRequest("/auth/register", {
        username,
        password,
      });
      console.log("Registration response:", response);
      if (response.type === "success") {
        console.log("Registration successful:", response.token);
        localStorage.setItem("authToken", response.token); // Store token as a string
        onRegisterSuccess(response.token);
      }
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      return {
        type: "error",
        message: "User exists.",
      };
    }
  };

  return (
    <div>
      <Navbar />
      <section className="flex justify-center">
        <div className="container p-14 mt-14">
          <h1 className="text-4xl font-semibold my-7">Register</h1>
          <UsernamePasswordForm onSubmit={handleRegister} />
          <p className="mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login here
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
