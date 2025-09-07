// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/edu_platform", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Doubt Schema
const doubtSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, default: "" },
  askedBy: { type: String, default: "Anonymous" },
});

const Doubt = mongoose.model("Doubt", doubtSchema);

// --- APIs ---
// Get all doubts
app.get("/doubts", async (req, res) => {
  const doubts = await Doubt.find();
  res.json(doubts);
});

// Ask a new doubt
app.post("/doubts", async (req, res) => {
  const { question, askedBy } = req.body;
  const doubt = new Doubt({ question, askedBy });
  await doubt.save();
  res.json(doubt);
});

// Answer a doubt
app.put("/doubts/:id", async (req, res) => {
  const { answer } = req.body;
  const doubt = await Doubt.findByIdAndUpdate(
    req.params.id,
    { answer },
    { new: true }
  );
  res.json(doubt);
});

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
