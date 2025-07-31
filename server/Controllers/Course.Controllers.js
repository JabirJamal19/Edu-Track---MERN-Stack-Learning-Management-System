const Course = require("../Models/course.model");
const User = require("../Models/user.model");

exports.enrollInCourse = async (req, res) => {
  const courseId = req.params.id;
  const userId = req.user._id;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const user = await User.findById(userId);

    // Check if already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: "Enrollment successful", course });
  } catch (err) {
    res.status(500).json({ message: "Enrollment failed", error: err.message });
  }
};


// Create a new course (Admin only)
exports.createCourse = async (req, res) => {
  const { title, description } = req.body;

  try {
    const course = await Course.create({
      title,
      description,
      createdBy: req.user._id, // Admin who created the course
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: "Failed to create course", error: err.message });
  }
};

// Get All Courses Created by Logged-In Admin
exports.getAdminCourses = async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.user._id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admin courses", error: err.message });
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("createdBy", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses", error: err.message });
  }
};

// Delete a course by ID (Admin only)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete course", error: err.message });
  }
};

// Update a course by ID (Admin only)
exports.updateCourse = async (req, res) => {
  const { title, description } = req.body;
  const courseId = req.params.id;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course updated successfully", course: updatedCourse });
  } catch (err) {
    res.status(500).json({ message: "Failed to update course", error: err.message });
  }
};


exports.getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("enrolledCourses");
    res.json(user.enrolledCourses);
  } catch (err) {
    res.status(500).json({ message: "Failed to get enrolled courses", error: err.message });
  }
};

