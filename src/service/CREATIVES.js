const bargainSchema = require("../models/bargainModel");
const userModel = require("../models/userModel");
const { USER_TYPE, ACCOUNT_STATUS } = require("../utils/constants");
const { initiatePaymentFlutterwave } = require("../integrations/flutterwave");
const { throwError } = require("../utils/handleErrors");
const reviewSchema = require("../models/reviewModel");
const { bargainEmail } = require("../utils/sendgrid");

class Creatives {
  constructor(data) {
    this.data = data;
    this.errors = [];
  }
  //  get all creatives
  async getAllCreatives() {
    return await userModel
      .find({ role: USER_TYPE.CREATIVE })
      .orFail(new Error("No Creative Found"));
  }

  // search creatives
  async searchCreatives() {
    const { gender, skill, country, location } = this.data;
    console.log({ skill });
    let query = {
      $or: [
        {
          address: new RegExp(location, "i"),
        },
        {
          country,
        },
        {
          gender,
        },
        {
          skill,
        },
      ],
      $and: [
        {
          status: ACCOUNT_STATUS.ACTIVE,
          role: USER_TYPE.CREATIVE,
        },
      ],
    };
    return await userModel.find(query);
  }

  // send bargain
  async sendBargain() {
    const { skill, projectDescription, proposedPrice, recieverId, senderId } =
      this.data;
    return await new bargainSchema({
      skill,
      projectDescription,
      proposedPrice,
      recieverId,
      senderId,
    }).save();
  }

  async acceptBargain() {
    const { id, response } = this.data;
    const bargain = await bargainSchema
      .findByIdAndUpdate(id, { status: response })
      .populate("senderId recieverId");
    if (response === "ACCEPTED") {
      const email = bargain.senderId.email;
      const name = bargain.senderId.firstName;
      const phone = bargain.senderId.phoneNumber;
      const amount = bargain.proposedPrice;
      const pay = await initiatePaymentFlutterwave(
        amount,
        email,
        phone,
        name,
        bargain.senderId._id
      );
      await bargainEmail(name, email, pay.data.link, "ACCEPTED");
    } else if (response === "DECLINED") {
    }
    return "RESPONSE SENT!!";
  }

  // get bargains
  async getBargains() {
    return await bargainSchema.find({}).populate("senderId recieverId");
  }

  // get bargains by id
  async getBargainById() {
    const { id } = this.data;
    return await bargainSchema.findById(id).populate("senderId recieverId");
  }

  // get bargains by user id
  async getBargainByUserId() {
    const { id } = this.data;
    return await bargainSchema
      .find({ $or: [{ recieverId: id }, { senderId: id }] })
      .populate("senderId recieverId");
  }

  async reviewCreative() {
    const { userId, stars, comment, creativeId } = this.data;
    return await new reviewSchema({
      userId,
      stars,
      comment,
      creativeId,
    }).save();
  }

  async getUserReview() {
    const { userId } = this.data;
    return await reviewSchema.find({ userId }).populate("userId creativeId");
  }
}

module.exports = Creatives;
