const userSchema = require("../models/userModel");
const {
  sendResetPasswordToken,
  registrationSuccessful,
  sendEmailVerificationToken,
  SuccessfulPasswordReset,
} = require("../utils/sendgrid");
const {
  throwError,
  handleCastErrorExceptionForInvalidObjectId,
} = require("../utils/handleErrors");
const { USER_TYPE } = require("../utils/constants");
const { validateParameters } = require("../utils/util");
const bcrypt = require("bcrypt");
const util = require("../utils/util");
const bankSchema = require("../models/bankModel");
const { getBanks } = require("../integrations/flutterwave");
const Wallet = require("./WALLET");
const { decodeJwtToken, verifyToken } = require("../core/userAuth");

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
    await Promise.all([this.emailExist(), this.phoneNumberExist()]);
    if (this.errors.length) {
      throwError(this.errors);
    }
    if (data.googleSigned) {
      data.verified = true;
    }
    const newUser = await userSchema.create(data);
    await new Wallet({ userId: newUser._id }).createWallet();
    const name = `${newUser.firstName} ${newUser.lastName}`;
    await registrationSuccessful(this.data.email, name);
    return newUser;
  }

  async resendEmailToken() {
    return registrationSuccessful(this.data.email);
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
    const user = await userSchema.find({});
    if (!user) throwError("Users Not Found!", 404);
    return user;
  }

  async getUserById() {
    const { userId } = this.data;
    const user = await userSchema.findOne({ _id: userId });
    if (!user) handleCastErrorExceptionForInvalidObjectId();
    return user;
  }

  async verifyUser() {
      const payload = verifyToken(this.data)
      const user = await userSchema.findById(payload.id);
      user.verified = true
      await user.save()
      if (!user){
        throwError(`Invalid Token!`)
      }
      return user
  }

  async addSkills() {
    const { userId, newSkills } = this.data;
    const user = await userSchema.findById(userId);
    return await user.addSkills(newSkills);
  }

  async addLanguages() {
    const { userId, newLanguages } = this.data;
    const user = await userSchema.findById(userId);
    return await user.addLanguages(newLanguages);
  }

  async updateUserDetails() {
    const { newDetails, oldDetails } = this.data;
    const updates = Object.keys(newDetails);
    const allowedUpdates = [
      "firstName",
      "lastName",
      "phoneNumber",
      "country",
      "state",
      "bio",
      "profilePicture",
      "validId",
      "certificates",
      "urls",
      "hourlyRate",
    ];
    return await util.performUpdate(
      updates,
      newDetails,
      allowedUpdates,
      oldDetails
    );
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
    return await sendEmailVerificationToken(email);
  }

  async forgotPassword() {
    const { email } = this.data;
    const verificationCode = Math.floor(100000 + Math.random() * 100000);
    if (!email) {
      throwError("Please Input Your Email");
    }
    const updateUser = await userSchema.findOneAndUpdate(
      {
        email,
      },
      { otp: verificationCode },
      { new: true }
    );
    if (!updateUser) {
      return throwError("Invalid Email");
    }
    await sendResetPasswordToken(
      updateUser.email,
      updateUser.firstName,
      updateUser.otp
    );

    return updateUser;
  }

  async resetPassword() {
    const { otp, newPassword } = this.data;
    if (!otp || !newPassword) {
      throwError("Please Input Your Otp and New Password");
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    const updateUser = await userSchema.findOneAndUpdate(
      {
        otp,
      },
      { otp: null, password: hashed },
      { new: true }
    );
    if (!updateUser) {
      throwError("Invalid OTP!");
    }
    await SuccessfulPasswordReset(updateUser.firstName, updateUser.email);
    return updateUser;
  }
}

module.exports = User;
