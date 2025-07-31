import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthPage = () => {
  const [mode, setMode] = useState("login"); // login | register

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h1 className="text-center fw-bold mb-4">EduTrack</h1>

      <div className="d-flex justify-content-center mb-4">
        <div className="form-check form-check-inline">
          <input
            type="radio"
            name="authMode"
            value="login"
            checked={mode === "login"}
            onChange={() => setMode("login")}
            className="form-check-input"
            id="loginRadio"
          />
          <label className="form-check-label" htmlFor="loginRadio">Login</label>
        </div>

        <div className="form-check form-check-inline">
          <input
            type="radio"
            name="authMode"
            value="register"
            checked={mode === "register"}
            onChange={() => setMode("register")}
            className="form-check-input"
            id="registerRadio"
          />
          <label className="form-check-label" htmlFor="registerRadio">Register</label>
        </div>
      </div>

      {mode === "login" ? <Login /> : <Register />}
    </div>
  );
};

export default AuthPage;
