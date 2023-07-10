const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  creativeId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

Schema.plugin(uniqueValidator, { message: "{TYPE} must be unique." });

const reviewSchema = mongoose.model("review", Schema);

module.exports = reviewSchema;
