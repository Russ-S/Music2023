const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mediaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", mediaSchema);
