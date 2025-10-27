import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthPage = () => {
  const [mode, setMode] = useState("login"); // login | register

  return (
    // Bootstrap: <div className="container mt-5" style={{ maxWidth: "600px" }}>
    <div className="container mx-auto mt-10 p-4 max-w-xl"> {/* Tailwind for centered container, top margin, padding, and max-width */}
      {/* Bootstrap: <h1 className="text-center fw-bold mb-4">EduTrack</h1> */}
      <h1 className="text-center text-4xl font-extrabold mb-8 text-gray-900">EduTrack</h1> {/* Tailwind for large bold heading and margins */}

      {/* Bootstrap: <div className="d-flex justify-content-center mb-4"> */}
      <div className="flex justify-center mb-6 space-x-4"> {/* Tailwind flex utilities, increased bottom margin, and space between items */}
        {/* Bootstrap: <div className="form-check form-check-inline"> */}
        {/* The overall structure of the radio buttons will be adjusted to Tailwind's approach */}
        <div className="flex items-center">
          <input
            type="radio"
            name="authMode"
            value="login"
            checked={mode === "login"}
            onChange={() => setMode("login")}
            // Bootstrap: className="form-check-input"
            className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer" // Tailwind form-radio utility and styling
            id="loginRadio"
          />
          {/* Bootstrap: <label className="form-check-label" htmlFor="loginRadio">Login</label> */}
          <label className="ml-2 text-gray-700 cursor-pointer" htmlFor="loginRadio">Login</label> {/* Tailwind margin-left and text color */}
        </div>

        {/* Bootstrap: <div className="form-check form-check-inline"> */}
        <div className="flex items-center">
          <input
            type="radio"
            name="authMode"
            value="register"
            checked={mode === "register"}
            onChange={() => setMode("register")}
            // Bootstrap: className="form-check-input"
            className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer" // Tailwind form-radio utility and styling
            id="registerRadio"
          />
          {/* Bootstrap: <label className="form-check-label" htmlFor="registerRadio">Register</label> */}
          <label className="ml-2 text-gray-700 cursor-pointer" htmlFor="registerRadio">Register</label> {/* Tailwind margin-left and text color */}
        </div>
      </div>

      {mode === "login" ? <Login /> : <Register />}
    </div>
  );
};

export default AuthPage;