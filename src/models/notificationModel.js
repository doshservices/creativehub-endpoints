const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { NOTIFICATION_TYPE } = require("../utils/constants");

const notificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    docId: {
      type: Schema.Types.ObjectId,
      refPath: "docModel",
    },
    docModel: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    notificationType: {
      type: String,
      enum: Object.keys(NOTIFICATION_TYPE),
    },
    price: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamp: true,
  }
);

notificationSchema.plugin(uniqueValidator, {
  message: "{TYPE} must be unique.",
});

const notificationModel = model("Notification", notificationSchema);
module.exports = notificationModel;
