const express = require("express");
const {
  createPerformance,
  getPerformance,
  getPerformances,
  deletePerformance,
  updatePerformance,
} = require("../controllers/PerformanceController");

const router = express.Router();

router.get("/", getPerformances);

// GET a single Performance
router.get("/:id", getPerformance);

// POST a new Performance
router.post("/", createPerformance);

// DELETE a Performance
router.delete("/:id", deletePerformance);

// UPDATE a new Performance
router.patch("/:id", updatePerformance);

module.exports = router;
