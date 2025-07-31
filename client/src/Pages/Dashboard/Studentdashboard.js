import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../Utils/Auth";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses:", err.message);
    }
  };

  // Fetch enrolled courses
  const fetchEnrolled = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses/my-courses", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const enrolledIds = res.data.map(course => course._id);
      setEnrolled(enrolledIds);
    } catch (err) {
      console.error("Failed to fetch enrolled courses:", err.message);
    }
  };

  // Enroll in a course
  const handleEnroll = async (courseId) => {
    try {
      await axios.post(`http://localhost:5000/api/courses/${courseId}/enroll`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchEnrolled();
    } catch (err) {
      console.error("Enrollment failed:", err.message);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrolled();
    setLoading(false);
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>; // Tailwind equivalent for text-center and margin-top

  return (
    // Bootstrap: <div className="container mt-5">
    <div className="container mx-auto mt-5 p-4"> {/* Tailwind for centered container with top margin and padding */}
      {/* Bootstrap: <div className="d-flex justify-content-between align-items-center mb-4"> */}
      <div className="flex justify-between items-center mb-6"> {/* Tailwind flex utilities and increased bottom margin */}
        {/* Bootstrap: <h2>Student Dashboard</h2> */}
        <h2 className="text-3xl font-bold text-gray-800">Student Dashboard</h2> {/* Tailwind for larger heading, bold, and color */}
        {/* Bootstrap: <button className="btn btn-danger" onClick={handleLogout}>Logout</button> */}
        <button 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition duration-150 ease-in-out" // Tailwind button styling
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Bootstrap: <h4>Available Courses</h4> */}
      <h4 className="text-2xl font-semibold mb-4 text-gray-700">Available Courses</h4> {/* Tailwind for heading and margin */}
      {/* Bootstrap: <div className="row"> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Tailwind for responsive grid layout with gaps */}
        {courses.map(course => (
          // Bootstrap: <div key={course._id} className="col-md-4 mb-4">
          <div key={course._id} className="mb-4"> {/* Removed col-md-4 as grid handles column layout */}
            {/* Bootstrap: <div className="card h-100"> */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"> {/* Tailwind for card styling, full height, and flex column */}
              {/* Bootstrap: <div className="card-body"> */}
              <div className="p-6 flex flex-col justify-between flex-grow"> {/* Tailwind for padding, flex column, justify content, and grow */}
                {/* Bootstrap: <h5 className="card-title">{course.title}</h5> */}
                <h5 className="text-xl font-bold mb-2">{course.title}</h5> {/* Tailwind for title styling and margin */}
                {/* Bootstrap: <p className="card-text">{course.description}</p> */}
                <p className="text-gray-700 mb-4 flex-grow">{course.description}</p> {/* Tailwind for text color, margin, and grow */}
                <button
                  // Bootstrap: className="btn btn-primary"
                  className={`w-full px-4 py-2 rounded text-white font-semibold transition duration-150 ease-in-out 
                    ${enrolled.includes(course._id) ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} // Tailwind button styling with conditional classes
                  disabled={enrolled.includes(course._id)}
                  onClick={() => handleEnroll(course._id)}
                >
                  {enrolled.includes(course._id) ? "Enrolled" : "Enroll"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap: <hr /> */}
      <hr className="my-8 border-gray-300" /> {/* Tailwind for horizontal rule with margin and border color */}

      {/* Bootstrap: <h4>My Enrolled Courses</h4> */}
      <h4 className="text-2xl font-semibold mb-4 text-gray-700">My Enrolled Courses</h4> {/* Tailwind for heading and margin */}
      {/* Bootstrap: <ul className="list-group"> */}
      <ul className="bg-white shadow rounded-lg divide-y divide-gray-200"> {/* Tailwind for list styling */}
        {courses
          .filter(course => enrolled.includes(course._id))
          .map(course => (
            // Bootstrap: <li key={course._id} className="list-group-item">
            <li key={course._id} className="p-4 flex items-center"> {/* Tailwind for list item padding and flex alignment */}
              <span className="text-lg font-medium text-gray-800">{course.title}</span> {/* Tailwind for text styling */}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;