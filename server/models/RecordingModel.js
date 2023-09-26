const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recordingSchema = new Schema(
  {
    composer: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "no-image.jpg",
    },
    composition: {
      type: String,
      required: true,
    },
    artists: {
      type: String,
      default: "None",
    },
    conductor: {
      type: String,
      default: "None",
    },
    ensemble: {
      type: String,
      default: "None",
    },
    media: {
      type: String,
      required: true,
    },
    source: {
      type: String,
    },
    digital: {
      type: String,
      default: "None",
    },
    workCategory: {
      type: String,
      required: true,
    },
    fileCategory: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    catalogNumber: {
      type: String,
      default: "None",
    },
    purchaseDate: {
      type: Date,
      required: true,
    },
    value: {
      type: String,
      default: "0.00",
    },
    tapeNumber: {
      type: String,
      default: "None",
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("recording", recordingSchema);
