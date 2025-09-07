const express = require("express");
const router = express.Router();
const Doubt = require("../models/Doubt");

// Post a new doubt
router.post("/", async (req, res) => {
  try {
    const doubt = new Doubt(req.body);
    await doubt.save();
    res.json(doubt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all doubts
router.get("/", async (req, res) => {
  const doubts = await Doubt.find();
  res.json(doubts);
});

// Resolve a doubt
router.put("/:id", async (req, res) => {
  try {
    const doubt = await Doubt.findByIdAndUpdate(
      req.params.id,
      { answer: req.body.answer, isResolved: true },
      { new: true }
    );
    res.json(doubt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
