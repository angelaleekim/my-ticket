import React from "react";
import { Link } from "react-router";
import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "./sendPostRequest";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

export function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await sendPostRequest("/auth/login", {
        username,
        password,
      });
      if (response.type === "success") {
        console.log("Login successful:", response.token);
        localStorage.setItem("authToken", response.token); // Store token as a string
        onLoginSuccess(response.token);
      }
      return response;
    } catch (error) {
      return {
        type: "error",
        message: "Server error. Please try again later.",
      };
    }
  };

  return (
    <div>
      <Navbar />
      <section className="flex justify-center">
        <div className="container p-14 mt-14">
          <h1 className="text-4xl font-semibold my-7">Login</h1>
          <UsernamePasswordForm onSubmit={handleLogin} />
          <p className="mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register here
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
