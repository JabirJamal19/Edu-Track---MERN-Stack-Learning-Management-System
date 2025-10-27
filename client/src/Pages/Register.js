import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default selected
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      const { token } = res.data;

      localStorage.setItem("token", token);

      if (formData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    // Bootstrap: <div className="container mt-5" style={{ maxWidth: "500px" }}>
    <div className="mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl max-w-lg"> {/* Tailwind for centering, margins, padding, background, shadow, and max-width */}
      {/* Bootstrap: <h2 className="mb-4">Register</h2> */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Register</h2> {/* Tailwind for heading styling and center alignment */}
      
      {/* Bootstrap: {error && <div className="alert alert-danger">{error}</div>} */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert"> {/* Tailwind for alert styling */}
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4"> {/* Tailwind for vertical spacing between form elements */}
        {/* Bootstrap: <div className="form-group mb-3"> */}
        <div>
          {/* Bootstrap: <label>Name:</label> */}
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          {/* Bootstrap: <input type="text" className="form-control" ... /> */}
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Bootstrap: <div className="form-group mb-3"> */}
        <div>
          {/* Bootstrap: <label>Email:</label> */}
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          {/* Bootstrap: <input type="email" className="form-control" ... /> */}
          <input
            type="email"
            id="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Bootstrap: <div className="form-group mb-3"> */}
        <div>
          {/* Bootstrap: <label>Password:</label> */}
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          {/* Bootstrap: <input type="password" className="form-control" ... /> */}
          <input
            type="password"
            id="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Bootstrap: <div className="form-group mb-3"> */}
        <div>
          {/* Bootstrap: <label>Role:</label> */}
          <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
          <div className="flex space-x-4"> {/* Tailwind for horizontal spacing between radio buttons */}
            {/* Bootstrap: <div className="form-check form-check-inline"> */}
            <div className="flex items-center">
              {/* Bootstrap: <input className="form-check-input" type="radio" ... /> */}
              <input
                className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer"
                type="radio"
                name="role"
                value="student"
                checked={formData.role === "student"}
                onChange={handleChange}
                id="studentRadio"
              />
              {/* Bootstrap: <label className="form-check-label">Student</label> */}
              <label htmlFor="studentRadio" className="ml-2 text-gray-700 cursor-pointer">Student</label>
            </div>

            {/* Bootstrap: <div className="form-check form-check-inline"> */}
            <div className="flex items-center">
              {/* Bootstrap: <input className="form-check-input" type="radio" ... /> */}
              <input
                className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer"
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleChange}
                id="adminRadio"
              />
              {/* Bootstrap: <label className="form-check-label">Admin</label> */}
              <label htmlFor="adminRadio" className="ml-2 text-gray-700 cursor-pointer">Admin</label>
            </div>
          </div>
        </div>

        {/* Bootstrap: <button type="submit" className="btn btn-success w-100">Register</button> */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150 ease-in-out"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;