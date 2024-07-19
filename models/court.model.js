const mongoose = require("mongoose");

const courtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surface: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Court = mongoose.model("Court", courtSchema);

module.exports = Court;
