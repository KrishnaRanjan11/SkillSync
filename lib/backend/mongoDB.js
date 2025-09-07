import mongoose from "mongoose";

const roadmapStepSchema = new mongoose.Schema({
  stepTitle: { type: String, required: true },
  detail: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  roadmap: [roadmapStepSchema],
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
