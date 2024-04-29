/*eslint-disable*/
const NotificationSchema = require("../models/notificationModel");
const { throwError } = require("../utils/handleErrors");

class Notification {
  constructor(data) {
    this.data = data;
    this.errors = [];
  }

  async createNotification(notificationDetails) {
    return await NotificationSchema.create(notificationDetails);
  }

  async getUserNotification() {
    const { userId, id } = this.data;
    return await NotificationSchema.findOne({ userId: userId, _id: id })
      .populate("userId docId")
      .orFail(() => throwError("User Notification Not Found", 404));
  }

  async getAllUserNotifications() {
    return await NotificationSchema.find(this.data)
      .sort({ createdAt: -1 })
      .populate("userId docId")
  }

  async markAllUserNotificationsAsRead() {
    return await NotificationSchema.updateMany({ userId: this.data.userId }, {isRead: true})
      .orFail(() => throwError("No Notification Found", 404));
  }

  async getNotification() {
    const notification = await NotificationSchema.findOne({ _id: this.data })
      .populate("userId docId")
      .orFail(() => throwError("Notification Not Found", 404));
    if (notification.isRead === false) {
      notification.isRead = true;
      await notification.save();
    }
    return notification;
  }

  // delete notification
  async deleteNotification() {
    return await NotificationSchema.findOneAndDelete({
      _id: this.data,
    }).orFail(() => throwError("Notification Not Found", 404));
  }
}

module.exports = Notification;
