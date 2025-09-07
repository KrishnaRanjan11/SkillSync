import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/tutorApp");

// ✅ Course Schema
const roadmapSchema = new mongoose.Schema({
  stepTitle: String,
  detail: String,
  isCompleted: { type: Boolean, default: false },
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  roadmap: [roadmapSchema],
});

const Course = mongoose.model("Course", courseSchema);

// ✅ Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  streak: { type: Number, default: 0 },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const Student = mongoose.model("Student", studentSchema);

// -------------------- API Routes --------------------

// 📍 Get all courses
app.get("/courses", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// 📍 Get student profile
app.get("/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id).populate("enrolledCourses");
  res.json(student);
});

// 📍 Enroll student in a course
app.post("/students/:id/enroll/:courseId", async (req, res) => {
  const student = await Student.findById(req.params.id);
  student.enrolledCourses.push(req.params.courseId);
  await student.save();
  res.json(student);
});

// 📍 Create new course (admin/tutor use)
app.post("/courses", async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json(course);
});

// 📍 Create new student
app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// ✅ Start server
app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
