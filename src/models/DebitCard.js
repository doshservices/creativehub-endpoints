const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const debitCard = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    authorization_code: {
      type: String,
      required: true,
      unique: true,
    },
    card_type: {
      type: String,
      required: true,
    },
    bin: {
      type: String,
      required: true,
    },
    last4: {
      type: String,
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
    exp_month: {
      type: String,
      required: true,
    },
    exp_year: {
      type: String,
    },
    country_code: {
      type: String,
    },
    signature: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ref) {
        delete ref.recipientCode;
      },
    },
    toObject: {
      transform(doc, ref) {
        delete ref.recipientCode;
      },
    },
  },
  {
    strictQuery: "throw",
  }
);

debitCard.plugin(uniqueValidator, { message: "{TYPE} must be unique." });

const debitCardModel = model("debit_card", debitCard);
module.exports = debitCardModel;
