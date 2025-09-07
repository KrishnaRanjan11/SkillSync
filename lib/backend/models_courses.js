const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  roadmap: [String],
});

module.exports = mongoose.model("Course", courseSchema);
