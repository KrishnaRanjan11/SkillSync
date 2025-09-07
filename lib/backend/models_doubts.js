const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
  question: String,
  studentName: String,
  isResolved: { type: Boolean, default: false },
  answer: String,
});

module.exports = mongoose.model("Doubt", doubtSchema);
