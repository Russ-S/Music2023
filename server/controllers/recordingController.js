const Recording = require("../models/RecordingModel");
const mongoose = require("mongoose");
const db = process.env.MONGO_URL;

// get all recordings
const getRecordings = async (req, res) => {
  const recordings = await Recording.find().sort({
    composer: 1,
    composition: 1,
  });

  res.status(200).json(recordings);
};

const findComposers = async () => {
  const composerNames = await Recordings.find().distinct("composer");
  return composerNames;
};

// get a single recording
const getRecording = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recording" });
  }

  const recording = await Recording.findById(id);

  if (!recording) {
    return res.status(404).json({ error: "No such recording" });
  }

  res.status(200).json(recording);
};

// create new recording
// router.route("/add").post(upload.single("coverImage"), (req, res) => {
//   const name = req.body.name;
//   const birthdate = req.body.birthdate;
//   const coverImage = req.file.originalname;
// const createRecording = async (req, res) => {
//   const newRecordingData = {
//     composer: req.body.composer,
//     coverImage: req.file.originalname,
//     composition: req.body.composition,
//     artists: req.body.artists,
//     conductor: req.body.conductor,
//     ensemble: req.body.ensemble,
//     media: req.body.media,
//     workCategory: req.body.workCategory,
//     fileCategory: req.body.fileCategory,
//     label: req.body.label,
//     catalogNumber: req.body.catalogNumber,
//     digital: req.body.digital,
//     source: req.body.source,
//     tapeNumber: req.body.tapeNumber,
//     purchaseDate: req.body.purchaseDate,
//     value: req.body.value,
//     location: req.body.location,
//   };

//   const newRecording = new Recording(newRecordingData);

//   newRecording
//     .save()
//     .then(() => res.json("Recording Added"))
//     .catch((err) => res.status(400).json("Error: " + err));
// };

const createRecording = async (req, res) => {
  const {
    composer,
    coverImage,
    composition,
    artists,
    conductor,
    ensemble,
    media,
    workCategory,
    fileCategory,
    label,
    catalogNumber,
    digital,
    source,
    tapeNumber,
    purchaseDate,
    value,
    location,
  } = req.body;

  // add doc to db
  try {
    const recording = await Recording.create({
      composer,
      coverImage,
      composition,
      artists,
      conductor,
      ensemble,
      media,
      workCategory,
      fileCategory,
      label,
      catalogNumber,
      digital,
      source,
      tapeNumber,
      purchaseDate,
      value,
      location,
    });
    res.status(200).json(recording);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a recording
const deleteRecording = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recording" });
  }

  const recording = await Recording.findOneAndDelete({ _id: id });

  if (!recording) {
    return res.status(404).json({ error: "No such recording" });
  }

  res.status(200).json(recording);
};

// update a recording
const updateRecording = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recording" });
  }

  const recording = await Recording.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!recording) {
    return res.status(404).json({ error: "No such recording" });
  }

  res.status(200).json(recording);
};

module.exports = {
  findComposers,
  createRecording,
  getRecordings,
  getRecording,
  deleteRecording,
  updateRecording,
};
