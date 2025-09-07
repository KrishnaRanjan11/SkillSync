const mongoose = require("mongoose");

const RoadmapStepSchema = new mongoose.Schema({
  stepTitle: { type: String, required: true },
  detail: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },  // ✅ added
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  roadmap: [RoadmapStepSchema],
});

module.exports = mongoose.model("Course", CourseSchema);
