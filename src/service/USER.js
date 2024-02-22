const userSchema = require("../models/userModel");
const {
  sendResetPasswordToken,
  registrationSuccessful,
  sendEmailVerificationToken,
} = require("../utils/sendgrid");
const { throwError, handleCastErrorExceptionForInvalidObjectId } = require("../utils/handleErrors");
const { USER_TYPE } = require("../utils/constants");
const { validateParameters } = require("../utils/util");
const bcrypt = require("bcrypt");
const util = require("../utils/util");
const bankSchema = require("../models/bankModel");
const { getBanks } = require("../integrations/flutterwave");

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
    } else {
      const newUser = await userSchema.create(data);
      if (newUser.googleSigned === true && newUser.role === "USER") {
        newUser.verified = true;
        await newUser.save();
      }
      const name = `${newUser.firstName} ${newUser.lastNmae}`;
      await registrationSuccessful(this.data.email, name);
      return newUser;
    }
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
    const { otp } = this.data;
    const user = await userSchema
      .findOne({ otp })
      if (!user) throwError("Invalid Otp", 400);

    user.verified = true;
    user.otp = null
    await user.save();

    return user;
  }

  async updateUserDetails() {
    const { newDetails, oldDetails } = this.data;
    const updates = Object.keys(newDetails);
    const allowedUpdates = [
      "firstName",
      "lastName",
      "phoneNumber",
      "country",
      "location",
      "gender",
      "skills",
      "bio",
      "profilePicture",
      "validId",
      "languages",
      "certificates",
      "urls",
      "hourlyRate",
      "status",
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

  async getBanks() {
    return await getBanks();
  }

  async addBank() {
    return await new bankSchema({
      userId: this.data.userId,
      bankName: this.data.bankName,
      accountName: this.data.accountName,
      accountNumber: this.data.accountNumber,
      bankCode: this.data.bankCode,
    }).save();
  }
}

module.exports = User;
