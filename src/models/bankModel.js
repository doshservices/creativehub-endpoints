const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "user",
    required: true,
  },
  bankName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  accountName: {
    type: String,
  },
  bankCode: {
    type: String,
  },
});

const bankSchema = model("bank", schema)
module.exports = bankSchema