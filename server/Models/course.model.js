const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Optional: link to admin who created the course
  },
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
