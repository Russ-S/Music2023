const express = require("express");
const {
  createMedia,
  getAllMedia,
  getSingleMedia,
  deleteMedia,
  updateMedia,
} = require("../controllers/MediaController");

const router = express.Router();

router.get("/", getAllMedia);

// GET a single Media
router.get("/:id", getSingleMedia);

// POST a new Media
router.post("/", createMedia);

// DELETE a Media
router.delete("/:id", deleteMedia);

// UPDATE a new Media
router.patch("/:id", updateMedia);

module.exports = router;
