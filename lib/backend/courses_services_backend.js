const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const Course = require("./models/Course");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/eduDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ✅ API: Get all courses
app.get("/courses", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// ✅ API: Get one course
app.get("/courses/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
});

// ✅ API: Add new course
app.post("/courses", async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json(course);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
