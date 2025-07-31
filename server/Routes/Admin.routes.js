const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../Middleware/AuthMiddleware");
const { getAllUsers, getAdminStats, promoteToAdmin, deleteUser} = require("../Controllers/Admin.Controller");

// Get All Users and Courses
router.get("/stats", protect, isAdmin, getAdminStats);
// Get All Users and Courses
router.get("/users", protect, isAdmin, getAllUsers);
// 🔼 Promote user to admin
router.put("/promote/:id", protect, isAdmin, promoteToAdmin);
// ❌ Delete user
router.delete("/users/:id", protect, isAdmin, deleteUser);

module.exports = router;
