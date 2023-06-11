const userModel = require("../models/userModel");
const { USER_TYPE, ACCOUNT_STATUS } = require("../utils/constants");
const { throwError } = require("../utils/handleErrors");

class Creatives {
  constructor(data) {
    this.data = data;
    this.errors = [];
  }

  async getAllCreatives() {
    return await userModel
      .find({role: USER_TYPE.CREATIVE}).orFail(new Error('No Creative Found'));
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
}

module.exports = Creatives;
