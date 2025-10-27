import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Invalid email format");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      const user = jwtDecode(token);
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    // Bootstrap: <div className="container mt-5" style={{ maxWidth: "400px" }}>
    <div className="mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl max-w-sm"> {/* Tailwind for centering, margins, padding, background, shadow, and max-width */}
      {/* Bootstrap: <h2 className="mb-4">Login</h2> */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Login</h2> {/* Tailwind for heading styling and center alignment */}
      
      {/* Bootstrap: {error && <div className="alert alert-danger">{error}</div>} */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert"> {/* Tailwind for alert styling */}
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleLogin} className="space-y-4"> {/* Tailwind for vertical spacing between form elements */}
        {/* Bootstrap: <div className="form-group mb-3"> */}
        <div> {/* No specific class needed for form-group in Tailwind, margin handled by space-y-4 on form */}
          {/* Bootstrap: <label>Email:</label> */}
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label> {/* Tailwind for label styling */}
          {/* Bootstrap: <input type="email" className="form-control" ... /> */}
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" // Tailwind input styling
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Bootstrap: <div className="form-group mb-3"> */}
        <div> {/* No specific class needed for form-group in Tailwind */}
          {/* Bootstrap: <label>Password:</label> */}
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label> {/* Tailwind for label styling */}
          {/* Bootstrap: <input type="password" className="form-control" ... /> */}
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" // Tailwind input styling
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Bootstrap: <button type="submit" className="btn btn-primary w-100">Login</button> */}
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150 ease-in-out" // Tailwind button styling
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;