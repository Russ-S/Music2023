const Performance = require("../models/PerformanceModel");
const mongoose = require("mongoose");

// get all performances
const getPerformances = async (req, res) => {
  const performances = await Performance.find().sort({
    composer: 1,
    composition: 1,
  });

  res.status(200).json(performances);
};

// get a single performance
const getPerformance = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Performance" });
  }

  const performance = await Performance.findById(id);

  if (!performance) {
    return res.status(404).json({ error: "No such performance" });
  }

  res.status(200).json(performance);
};

// create new performance
const createPerformance = async (req, res) => {
  const {
    composer,
    performanceDate,
    composition,
    artists,
    conductor,
    ensemble,
    concertHall,
    workCategory,
    city,
    state,
    notes,
  } = req.body;

  // add doc to db
  try {
    const performance = await Performance.create({
      composer,
      performanceDate,
      composition,
      artists,
      conductor,
      ensemble,
      concertHall,
      workCategory,
      city,
      state,
      notes,
    });
    res.status(200).json(performance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a performance
const deletePerformance = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such performance" });
  }

  const performance = await Performance.findOneAndDelete({ _id: id });

  if (!performance) {
    return res.status(404).json({ error: "No such performance" });
  }

  res.status(200).json(performance);
};

// update a performance
const updatePerformance = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such performance" });
  }

  const performance = await Performance.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!performance) {
    return res.status(404).json({ error: "No such performance" });
  }

  res.status(200).json(performance);
};

module.exports = {
  createPerformance,
  getPerformances,
  getPerformance,
  deletePerformance,
  updatePerformance,
};
