const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const composerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Composer", composerSchema);
