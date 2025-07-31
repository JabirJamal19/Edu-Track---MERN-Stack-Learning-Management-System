const express = require("express");
const router = express.Router();
const { createCourse, getCourses, deleteCourse, enrollInCourse, updateCourse, getEnrolledCourses, getAdminCourses } = require("../Controllers/Course.Controllers");
const { protect, isAdmin } = require("../Middleware/AuthMiddleware");


// Create course (Admin only)
router.post("/", protect, isAdmin, createCourse);

// Get all courses
router.get("/", protect, getCourses);

// Delete course (Admin only)
router.delete("/:id", protect, isAdmin, deleteCourse);

// Update course (Admin only)
router.put("/:id", protect, isAdmin, updateCourse);


// Enroll in a course (Student)
router.post("/:id/enroll", protect, enrollInCourse);

// Enroll in all courses
router.get("/my-courses", protect, getEnrolledCourses);

//Get All Courses Created by Logged-In Admin
router.get("/admin-courses", protect, isAdmin, getAdminCourses);


module.exports = router;
