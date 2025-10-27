import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../Utils/Auth";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err.message);
    }
  };

  const promoteToAdmin = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/promote/${id}`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Promote failed:", err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    // Bootstrap: <div className="container mt-4">
    // Tailwind: flex flex-col justify-center items-center h-full means full page
    <div className="container mx-auto mt-4 p-4"> {/* Added mx-auto for horizontal centering and p-4 for some padding */}
      {/* Bootstrap: <h3>All Users</h3> */}
      <h3 className="text-2xl font-bold mb-4">All Users</h3> {/* Tailwind classes for heading and margin-bottom */}
      
      {/* Bootstrap: <ul className="list-group"> */}
      <ul className="bg-white shadow rounded-lg divide-y divide-gray-200"> {/* Tailwind classes for list styling */}
        {users.map(user => (
          // Bootstrap: <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
          <li key={user._id} className="p-4 flex justify-between items-center"> {/* Tailwind flex utilities and padding */}
            <div>
              <strong className="font-semibold">{user.name}</strong> – {user.email} (<span className="capitalize">{user.role}</span>) {/* Added font-semibold and capitalize */}
            </div>
            <div className="space-x-2"> {/* Tailwind for spacing between buttons */}
              {user.role !== "admin" && (
                // Bootstrap: <button className="btn btn-sm btn-success me-2" onClick={() => promoteToAdmin(user._id)}>Promote</button>
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded transition duration-150 ease-in-out" // Tailwind button styles
                  onClick={() => promoteToAdmin(user._id)}
                >
                  Promote
                </button>
              )}
              {/* Bootstrap: <button className="btn btn-sm btn-danger" onClick={() => deleteUser(user._id)}>Delete</button> */}
              <button 
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded transition duration-150 ease-in-out" // Tailwind button styles
                onClick={() => deleteUser(user._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;