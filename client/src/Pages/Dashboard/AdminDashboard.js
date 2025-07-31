import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../Utils/Auth";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, description };
    const headers = { Authorization: `Bearer ${getToken()}` };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/courses/${editId}`, payload, { headers });
      } else {
        await axios.post("http://localhost:5000/api/courses", payload, { headers });
      }
      setTitle("");
      setDescription("");
      setEditId(null);
      fetchCourses();
    } catch (err) {
      console.error("Failed to save course:", err.message);
    }
  };

  const handleEdit = (course) => {
    setTitle(course.title);
    setDescription(course.description);
    setEditId(course._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchCourses();
    } catch (err) {
      console.error("Failed to delete:", err.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Course Title"
            required
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editId ? "Update Course" : "Create Course"}
          </button>
        </form>

        <h4 className="mt-8 text-xl font-semibold text-gray-700">All Courses</h4>
        <ul className="mt-4 space-y-3">
          {courses.map((course) => (
            <li key={course._id} className="p-4 bg-gray-50 border rounded flex justify-between items-center">
              <div>
                <h5 className="font-bold">{course.title}</h5>
                <p>{course.description}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={() => navigate("/admin/dashboard/users")}
          >
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
