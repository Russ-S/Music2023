const express = require("express");
const {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/CategoryController");

const router = express.Router();

router.get("/", getCategories);

// GET a single Media
router.get("/:id", getCategory);

// POST a new Media
router.post("/", createCategory);

// DELETE a Media
router.delete("/:id", deleteCategory);

// UPDATE a new Media
router.patch("/:id", updateCategory);

module.exports = router;
