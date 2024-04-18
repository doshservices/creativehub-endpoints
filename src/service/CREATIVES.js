const bargainSchema = require("../models/bargainModel");
const userModel = require("../models/userModel");
const {
  USER_TYPE,
  ACCOUNT_STATUS,
  BARGAIN_STATUS,
} = require("../utils/constants");
const {
  initializePayment,
  verifyPayment,
} = require("../integrations/paystackClient");
const { throwError } = require("../utils/handleErrors");
const reviewSchema = require("../models/reviewModel");
const { bargainEmail, requestBargainEmail, bargainPaidEmail } = require("../utils/sendgrid");
const userSchema = require("../models/userModel");

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

    let query = {
      $or: [
        {
          country,
        },
        {
          gender,
        },
        {
          skills: skill,
        },
        {
          address: new RegExp(location, "i"),
        },
      ],
      $and: [
        {
          role: USER_TYPE.CREATIVE,
        },
        {
          status: ACCOUNT_STATUS.ACTIVE,
        },
      ],
    };
    return await userModel.find(query);
  }

  // send bargain
  async sendBargain() {
    const reciever = await userSchema.findById(this.data.recieverId);
    const sender = await userSchema.findById(this.data.senderId);
    const bargain = await new bargainSchema(this.data).save();
    await requestBargainEmail(
      reciever.firstName,
      reciever.email,
      sender.firstName,
      this.data.proposedPrice,
      this.data.projectDescription
    );
    return bargain;
  }

  async acceptBargain() {
    const { id, response, userId } = this.data;
    const bargain = await bargainSchema
      .findById(id)
      .populate("senderId recieverId");
    if (!bargain) return throwError("Invalid Bargain Id Supplied!!");
    if (bargain.status !== BARGAIN_STATUS.PENDING)
      return throwError("Bargain Has Already Been Cancelled Or Accepted!");
    if (userId.toString() !== bargain.recieverId._id.toString())
      return throwError(
        "Unauthourized!. This Bargain Wasn't Sent To You!",
        401
      );
    bargain.status = response;
    await bargain.save();
    const email = bargain.senderId.email;
    const name = bargain.senderId.firstName;
    if (response === BARGAIN_STATUS.ACCEPTED) {
      const pay = await initializePayment(
        bargain.senderId.email,
        bargain.proposedPrice,
        bargain._id,
      );
      await bargainEmail(
        name,
        email,
        pay.confirmationUrl,
        BARGAIN_STATUS.ACCEPTED
      );
    } else if (response === BARGAIN_STATUS.DECLINED) {
      await bargainEmail(name, email, undefined, BARGAIN_STATUS.DECLINED);
    }
    return "RESPONSE SENT!";
  }

  async verifyBargainPayment() {
    const ref = this.data;
    const { status, message, paymentDate, authorization, customer, metadata } =
      await verifyPayment(ref);
    console.log({
      status,
      message,
      paymentDate,
      authorization,
      customer,
      metadata,
    });
    if (status === "success") {
      const bargain = await bargainSchema.findById(metadata.docId)
      const [user, creative] = await Promise.all([
        userSchema.findById(bargain.senderId),
        userSchema.findById(bargain.recieverId),
      ]);
      console.log({user, creative});
      bargain.status = BARGAIN_STATUS.PAID
      await bargain.save()
      await bargainPaidEmail(
        creative.firstName + " " + creative.lastName,
        creative.email,
        bargain.proposedPrice,
        user.firstName + " " + user.lastName
      );
      return "Payment Successful!";
    }
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
    review
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
