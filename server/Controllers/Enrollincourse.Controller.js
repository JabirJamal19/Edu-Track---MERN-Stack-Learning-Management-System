// controllers/Course.Controllers.js
const Course = require("../Models/course.model");
const User = require("../Models/user.model");

exports.enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    // Prevent duplicate enrollments
    if (user.enrolledCourses.includes(course._id))
      return res.status(400).json({ message: "Already enrolled in this course" });

    user.enrolledCourses.push(course._id);
    await user.save();

    res.status(200).json({ message: "Enrolled successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Enrollment failed", error: error.message });
  }
};
