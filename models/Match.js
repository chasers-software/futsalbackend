const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  futsal: {
    type: mongoose.Types.ObjectId,
    ref: "Futsal",
    required: [true, "Please provide futsal"],
  },
  futsalName: {
    type: String,
    required: [true, "Please provide futsal Name"],
  },
  location: {
    type: String,
    required: [true, "Please provide location"],
  },
  bookedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide operator"],
  },
  date: {
    type: String,
    required: [true, "Please provide date"],
  },
  startTime: {
    type: String,
    required: [true, "Please provide start time"],
  },
  endTime: {
    type: String,
    required: [true, "Please provide end time"],
  },
  price: {
    type: String,
    required: [true, "Please provide price"],
  },
  status: {
    type: String,
    required: [true, "Please provide status"],
    enum: ["open", "booked"],
    default: "open",
  },
});

module.exports = mongoose.model("Match", MatchSchema);
