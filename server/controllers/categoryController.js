const Category = require("../models/CategoryModel");
const mongoose = require("mongoose");

// get all Categories
const getCategories = async (req, res) => {
  const category = await Category.find().sort({ name: 1 });

  res.status(200).json(category);
};

// get a Category
const getCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such category" });
  }

  const category = await Category.findById(id);

  if (!category) {
    return res.status(404).json({ error: "No such category" });
  }

  res.status(200).json(category);
};

// create new Category
const createCategory = async (req, res) => {
  const { name } = req.body;

  // add doc to db
  try {
    const category = await Category.create({ name });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Category" });
  }

  const category = await Category.findOneAndDelete({ _id: id });

  if (!category) {
    return res.status(404).json({ error: "No such Category" });
  }

  res.status(200).json(category);
};

// update a Category
const updateCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Category" });
  }

  const category = await Category.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!category) {
    return res.status(404).json({ error: "No such Category" });
  }

  res.status(200).json(category);
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
};
