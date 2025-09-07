// ✅ Update a specific roadmap step's completion
app.patch("/courses/:courseId/roadmap/:stepIndex", async (req, res) => {
  const { courseId, stepIndex } = req.params;
  const { isCompleted } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.roadmap[stepIndex]) {
      course.roadmap[stepIndex].isCompleted = isCompleted;
      await course.save();
      return res.json(course);
    } else {
      return res.status(404).json({ message: "Step not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
