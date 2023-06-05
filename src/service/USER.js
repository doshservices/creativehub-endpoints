const userSchema = require("../models/userModel");
const { sendEmailToken } = require("../utils/sendgrid");
const { throwError } = require("../utils/handleErrors");
const { USER_TYPE } = require("../utils/constants");
const { validateParameters } = require("../utils/util");
const bcrypt = require("bcrypt");
const { findOne } = require("../models/userModel");

class User {
  constructor(data) {
    this.data = data;
    this.errors = [];
  }

  async emailExist() {
    const user = await userSchema.findOne({ email: this.data.email });
    if (user) {
      this.errors.push("Email already taken");
      return true;
    }
    return false;
  }

  async phoneNumberExist() {
    const user = await userSchema.findOne({
      phoneNumber: this.data.phoneNumber,
    });
    if (user) {
      this.errors.push("Phone Number already taken");
      return true;
    }
    return false;
  }

  async signup() {
    const data = this.data;
    const verificationCode = Math.floor(100000 + Math.random() * 100000);
    if (data.googleSigned === false) {
      data.otp = verificationCode;
    }
    await Promise.all([this.emailExist(), this.phoneNumberExist()]);
    if (this.errors.length) {
      throwError(this.errors);
    }
    const newUser = await new userSchema(data).save();
    if (newUser.googleSigned === true && newUser.role === "USER") {
      newUser.verified = true;
    }
    console.log(this.data.email);
    await sendEmailToken(this.data.email, verificationCode);
    return newUser;
  }

  async login() {
    const { loginId, password } = this.data;
    const validParameters = validateParameters(
      ["loginId", "password"],
      this.data
    );
    const { isValid, messages } = validParameters;

    if (!isValid) {
      throwError(messages);
    }
    return await userSchema.findByCredentials(loginId, password);
  }

  async getAllUsers() {
    return await userSchema.find({}).exec();
  }

  async getUserById() {
    const { userId } = this.data;
    return await userSchema.findOne({ _id: userId }).exec();
  }

  async verifyUser() {
    const { otp, userId } = this.data;
    const user = await userSchema.findOne({ _id: userId });
    if (otp === user.otp) {
      if (user.role === USER_TYPE.USER) {
        user.verified = true;
        await user.save();
      }
    }
    return user;
  }

  async addUserInterest() {
    const { userId, interest } = this.data;
    return await userSchema.updateOne({ _id: userId, interest });
  }

  async followUser() {
    const { userId, followerId } = this.data;
    const findUser = await userSchema.findByIdAndUpdate({ _id: userId });
    findUser.followers.push(followerId);
    return await findUser.save();
  }

  async unFollowUser() {
    const { userId, followerId } = this.data;
    const findUser = await userSchema.findByIdAndUpdate({ _id: userId });

    for (let i = 0; i < findUser.followers.length; i++) {
      if (findUser.followers[i].toString() === followerId.toString()) {
        const index = findUser.followers[i];

        // only splice array when item is found
        findUser.followers.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    return await findUser.save();
  }

  async sendOtp() {
    const { email } = this.data;
    const verificationCode = Math.floor(100000 + Math.random() * 100000);

    const user = await userSchema.findOne({ email });
    if (user) {
      user.otp = verificationCode;
      await sendEmailToken(email, verificationCode);
    }
    return "OTP SENT!";
  }

  async ResetPassword() {
    const { loginId, newPassword, oldPassword } = this.data;
    const ComfirmPassword = await userSchema.findByCredentials(
      loginId,
      oldPassword
    );
    if (ComfirmPassword) {
      const hashed = await bcrypt.hash(newPassword, 10);
      const user = await userSchema.findOneAndUpdate(
        { email: loginId },
        { token: null, password: hashed },
        { new: true }
      );
      return await user.save();
    }
  }

  async forgotPassword() {
    const { loginId, otp, newPassword } = this.data;
    const user = await userSchema.findOne({ email: loginId });
    if (user.otp === otp) {
      user.password = await bcrypt.hash(newPassword, 10);
      return await user.save();
    }
  }

  
}

module.exports = User;