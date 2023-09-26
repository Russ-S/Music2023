const express = require("express");
const {
  createRecording,
  getRecording,
  getRecordings,
  deleteRecording,
  updateRecording,
} = require("../controllers/recordingController");

const router = express.Router();

router.get("/", getRecordings);

// GET a single Recording
router.get("/:id", getRecording);

// POST a new Recording
router.post("/", createRecording);

// DELETE a Recording
router.delete("/:id", deleteRecording);

// UPDATE a new Recording
router.patch("/:id", updateRecording);

module.exports = router;
