const mongoose = require("mongoose");

const FutsalSchema = new mongoose.Schema({
  futsalName: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  location: {
    type: String,
    required: [true, "Please provide location"],
    maxlength: 50,
    minlength: 3,
  },
  operator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide operator"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  futsalPictures: [
    {
      type: String,
      default: "",
    },
  ],
  description: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Futsal", FutsalSchema);
