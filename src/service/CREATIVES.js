const bargainSchema = require("../models/bargainModel");
const userModel = require("../models/userModel");
const { USER_TYPE, ACCOUNT_STATUS } = require("../utils/constants");
const { throwError } = require("../utils/handleErrors");

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
          address: new RegExp(location, "i"),
        },
        {
          country,
        },
        {
          gender,
        },
        {
          skill: new RegExp(skill, "i"),
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
    const { skill, projectDescription, audio, recieverId, senderId } =
      this.data;
    return await new bargainSchema({
      skill,
      projectDescription,
      audio,
      recieverId,
      senderId,
    }).save();
  }

  async acceptBargain() {
    const { id, response } = this.data;
    const creatives = await bargainSchema
      .findByIdAndUpdate(id, {status: response})
      .populate("senderId recieverId");
    console.log({creatives});
    return creatives;
  }

  // get bargains
  async getBargains() {
    return await bargainSchema.find({})
    .populate("senderId recieverId");
  }
}

module.exports = Creatives;
