const reviewSchema = require("../models/reviewModel");
const Notification = require("./Notification");

class REVIEW {
    constructor(data) {
        this.data = data
        this.errors = []
    }

    async reviewCreative() {
        const {userId, stars, comment} = this.data
        await new Notification().createNotification({
          userId: userId,
          docId: bargain._id,
          docModel: "review",
          message: `${bargain.recieverId.firstName} ${bargain.recieverId.lastName} has accepted your bargain`,
          image: bargain.recieverId.profileImg,
          notificationType: NOTIFICATION_TYPE.BARGAIN,
        });
        return await new reviewSchema({userId, stars, comment}).save()
    }
}

module.exports = REVIEW