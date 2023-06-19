const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const { throwError } = require("../utils/handleErrors");
const { GENDER, bargain_TYPE, SERVICE_TYPE, SUBSCRITION_STATUS, ACCOUNT_STATUS } = require("../utils/constants");


const Schema = new mongoose.Schema({
  skill: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.keys(GENDER),
  },
  audio: {
    type: String,
  },
})





Schema.plugin(uniqueValidator, { message: "{TYPE} must be unique." });

const bargainSchema = mongoose.model('bargain', Schema)

module.exports = bargainSchema