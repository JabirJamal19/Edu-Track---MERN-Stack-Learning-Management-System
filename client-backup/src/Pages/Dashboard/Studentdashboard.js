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

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <h4>Available Courses</h4>
      <div className="row">
        {courses.map(course => (
          <div key={course._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <button
                  className="btn btn-primary"
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

      <hr />

      <h4>My Enrolled Courses</h4>
      <ul className="list-group">
        {courses
          .filter(course => enrolled.includes(course._id))
          .map(course => (
            <li key={course._id} className="list-group-item">
              {course.title}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
