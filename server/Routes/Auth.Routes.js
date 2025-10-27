const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../Controllers/Auth.Controller");
const { protect, isAdmin } = require("../Middleware/AuthMiddleware");


router.post("/register", registerUser);
router.post("/login", loginUser);

// GET user profile (protected route)
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// GET admin-only dashboard
router.get("/admin-dashboard", protect, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});


module.exports = router;
