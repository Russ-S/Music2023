const Label = require("../models/LabelModel");
const mongoose = require("mongoose");

// get all Medias
const getLabels = async (req, res) => {
  const label = await Label.find().sort({ name: 1 });

  res.status(200).json(label);
};

// get a single label
const getLabel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such label" });
  }

  const label = await Label.findById(id);

  if (!label) {
    return res.status(404).json({ error: "No such label" });
  }

  res.status(200).json(label);
};

// create new label
const createLabel = async (req, res) => {
  const { name } = req.body;

  // add doc to db
  try {
    const label = await Label.create({ name });
    res.status(200).json(label);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a label
const deleteLabel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such label" });
  }

  const label = await Label.findOneAndDelete({ _id: id });

  if (!label) {
    return res.status(404).json({ error: "No such label" });
  }

  res.status(200).json(label);
};

// update a label
const updateLabel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such label" });
  }

  const label = await Label.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!label) {
    return res.status(404).json({ error: "No such label" });
  }

  res.status(200).json(label);
};

module.exports = {
  createLabel,
  getLabels,
  getLabel,
  deleteLabel,
  updateLabel,
};
