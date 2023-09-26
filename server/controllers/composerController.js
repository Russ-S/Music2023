const Composer = require("../models/ComposerModel");
const mongoose = require("mongoose");

// get all composers
const getComposers = async (req, res) => {
  const composers = await Composer.find().sort({ name: 1 });

  res.status(200).json(composers);
};

// get a single composer
const getComposer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such composer" });
  }

  const composer = await Composer.findById(id);

  if (!composer) {
    return res.status(404).json({ error: "No such composer" });
  }

  res.status(200).json(composer);
};

// create new composer
const createComposer = async (req, res) => {
  const { name } = req.body;

  // add doc to db
  try {
    const composer = await Composer.create({ name });
    res.status(200).json(composer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a composer
const deleteComposer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such composer" });
  }

  const composer = await Composer.findOneAndDelete({ _id: id });

  if (!composer) {
    return res.status(404).json({ error: "No such composer" });
  }

  res.status(200).json(composer);
};

// update a composer
const updateComposer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such composer" });
  }

  const composer = await Composer.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!composer) {
    return res.status(404).json({ error: "No such composer" });
  }

  res.status(200).json(composer);
};

module.exports = {
  createComposer,
  getComposers,
  getComposer,
  deleteComposer,
  updateComposer,
};
