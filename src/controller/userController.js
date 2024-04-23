const User = require("../service/USER");
const { success, error } = require("../utils/baseController");
const { generateAuthToken } = require("../core/userAuth");
const { logger } = require("../utils/logger");

module.exports.signup = async (req, res) => {
  try {
    const user = await new User(req.body).signup();
    const token = await generateAuthToken({
      id: user._id,
      email: user.email,
      role: user.role,
      subscribedUser: user.subscribed,
    });
    return success(res, { user, token });
  } catch (err) {
    logger.error("Error occurred at signup", err);
    error(res, { code: err.code, message: err.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = await new User(req.body).login();
    const token = await generateAuthToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    return success(res, { user, token });
  } catch (err) {
    logger.error("Error occurred at login", err);
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const user = await new User(req.body).getAllUsers();
    return success(res, { user });
  } catch (err) {
    logger.error("Error occurred at getAllUsers", err);
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await new User({ userId: req.params.userId }).getUserById();
    return success(res, { user });
  } catch (err) {
    logger.error("Error occurred at getUserById", err);
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.verifyUserEmail = async (req, res) => {
  try {
    const user = await new User({ otp: req.body.otp }).verifyUser();
    return success(res, { user }, "user Email has been verified");
  } catch (err) {
    logger.error("Error occurred at verifyUserEmail", err);
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.sendOtp = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await new User({ email }).sendOtp();
    console.log(user);
    return success(res, { user });
  } catch (err) {
    logger.error("Error occurred at sendOtp", err);
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.addSkills = async (req, res) => {
  try {
    const skills = await new User({
      userId: req.user._id,
      ...req.body,
    }).addSkills();
    return success(res, { skills });
  } catch (err) {
    logger.error("Error occurred at addSkills", err);
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.addLanguages = async (req, res) => {
  try {
    const languages = await new User({
      userId: req.user._id,
      ...req.body,
    }).addLanguages();
    return success(res, { languages });
  } catch (err) {
    logger.error("Error occurred at addLanguages", err);
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.updateUserDetails = async (req, res) => {
  try {
    const oldDetails = req.user;
    const newDetails = req.body;
    const user = await new User({ newDetails, oldDetails }).updateUserDetails();
    return success(res, { user }, "User Profile Updated");
  } catch (err) {
    logger.error("Error occurred at updateUserDetails", err);
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.followUser = async (req, res) => {
  try {
    const followerId = req.user._id;
    const userId = req.query.userId;
    const user = await new User({ followerId, userId }).followUser();
    return success(res, { user }, "user Followed");
  } catch (err) {
    logger.error("Error occurred at followUser", err);
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.unfollowUser = async (req, res) => {
  try {
    const followerId = req.user._id;
    const userId = req.query.userId;
    const user = await new User({ followerId, userId }).unFollowUser();
    return success(res, { user }, "You unfollowed this user");
  } catch (err) {
    logger.error("Error occurred at followUser", err);
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.getBanks = async (req, res) => {
  try {
    const banks = await new User({}).getBanks();
    return success(res, { banks });
  } catch (err) {
    logger.error("Error occurred at getBanks", err);
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.addBank = async (req, res) => {
  try {
    const { accountName, bankName, accountNumber, bankCode } = req.body;
    const userId = req.user._id;
    const bank = await new User({
      userId,
      accountName,
      bankName,
      accountNumber,
      bankCode,
    }).addBank();
    return success(res, { bank }, "Bank Details Has Been Saved");
  } catch (err) {
    logger.error("Error occurred at addBank", err);
    return error(res, { code: err.code, message: err.message });
  }
};

exports.forgotPassword = (req, res) => {
  new User(req.body)
    .forgotPassword()
    .then((data) =>
      success(res, {
        status: "success",
        success: true,
        message: "Token Has Been Sent To Your Email",
      })
    )
    .catch((err) => {
      logger.error("Error occurred at forgotPassword", err);
      return error(res, { code: err.code, message: err.message });
    });
};

exports.resetPassword = (req, res) => {
  new User(req.body)
    .resetPassword()
    .then((data) =>
      success(res, {
        status: "success",
        success: true,
        message: "Password Reset Successful",
      })
    )
    .catch((err) => {
      logger.error("Error occurred at resetPassword", err);
      return error(res, { code: err.code, message: err.message });
    });
};
