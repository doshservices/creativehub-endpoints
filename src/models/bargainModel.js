const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const { BARGAIN_STATUS } = require("../utils/constants");


const Schema = new mongoose.Schema({
  skill: {
    type: String,
    required: true
  },
  recieverId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  projectDescription: {
    type: String,
    required: true
  },
  proposedPrice: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.keys(BARGAIN_STATUS),
    default: BARGAIN_STATUS.PENDING
  },
}, {timestamps: true}, {timeseries: true})





Schema.plugin(uniqueValidator, { message: "{TYPE} must be unique." });

const bargainSchema = mongoose.model('bargain', Schema)

module.exports = bargainSchema