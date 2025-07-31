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
    <div className="container mt-4">
      <h3>All Users</h3>
      <ul className="list-group">
        {users.map(user => (
          <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{user.name}</strong> – {user.email} ({user.role})
            </div>
            <div>
              {user.role !== "admin" && (
                <button className="btn btn-sm btn-success me-2" onClick={() => promoteToAdmin(user._id)}>Promote</button>
              )}
              <button className="btn btn-sm btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
