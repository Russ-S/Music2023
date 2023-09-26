const express = require("express");
const {
  createComposer,
  getComposer,
  getComposers,
  deleteComposer,
  updateComposer,
} = require("../controllers/ComposerController");

const router = express.Router();

router.get("/", getComposers);

// GET a single Composer
router.get("/:id", getComposer);

// POST a new Composer
router.post("/", createComposer);

// DELETE a Composer
router.delete("/:id", deleteComposer);

// UPDATE a new Composer
router.patch("/:id", updateComposer);

module.exports = router;
