const mongoose = require("mongoose");

// RoadmapStep schema
const RoadmapStepSchema = new mongoose.Schema({
  stepTitle: { type: String, required: true },
  detail: { type: String, required: true },
  isCompleted: { type: Boolean, default: false }
});

// Course schema
const CourseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  roadmap: [RoadmapStepSchema]
});

module.exports = mongoose.model("Course", CourseSchema);
