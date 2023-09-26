const express = require("express");
const {
  createLabel,
  getLabels,
  getLabel,
  deleteLabel,
  updateLabel,
} = require("../controllers/LabelController");

const router = express.Router();

router.get("/", getLabels);

// GET a single Media
router.get("/:id", getLabel);

// POST a new Media
router.post("/", createLabel);

// DELETE a Media
router.delete("/:id", deleteLabel);

// UPDATE a new Media
router.patch("/:id", updateLabel);

module.exports = router;
