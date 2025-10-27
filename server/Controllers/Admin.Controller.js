const User = require("../Models/user.model");
const Course = require("../Models/course.model");


// @desc   Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Don't return passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// 🔼 Promote a user to admin
exports.promoteToAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.status(200).json({ message: "User promoted to admin successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to promote user", error: err.message });
  }
};

// ❌ Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
};


// Get All Users and Courses
exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();

    res.json({
      totalUsers,
      totalCourses,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};

//Get All User (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").populate("enrolledCourses", "title");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};