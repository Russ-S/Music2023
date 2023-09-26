const Media = require("../models/MediaModel");
const mongoose = require("mongoose");

// get all Medias
const getAllMedia = async (req, res) => {
  const media = await Media.find().sort({ name: 1 });

  res.status(200).json(media);
};

// get a single media type
const getSingleMedia = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such media type" });
  }

  const media = await Media.findById(id);

  if (!media) {
    return res.status(404).json({ error: "No such media type" });
  }

  res.status(200).json(media);
};

// create new media type
const createMedia = async (req, res) => {
  const { name } = req.body;

  // add doc to db
  try {
    const media = await Media.create({ name });
    res.status(200).json(media);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a media type
const deleteMedia = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such media type" });
  }

  const media = await Media.findOneAndDelete({ _id: id });

  if (!media) {
    return res.status(404).json({ error: "No such media type" });
  }

  res.status(200).json(media);
};

// update a media type
const updateMedia = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such media type" });
  }

  const media = await Media.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!media) {
    return res.status(404).json({ error: "No such media type" });
  }

  res.status(200).json(media);
};

module.exports = {
  createMedia,
  getAllMedia,
  getSingleMedia,
  deleteMedia,
  updateMedia,
};
