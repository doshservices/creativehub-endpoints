const Creatives = require("../service/CREATIVES");
const { success, error } = require("../utils/baseController");

module.exports.getAllCreatives = async (req, res) => {
  try {
    const creatives = await new Creatives().getAllCreatives();
    return success(res, { creatives });
  } catch (err) {
    error(res, { code: err.code, message: err.message });
  }
};

module.exports.searchCreatives = async (req, res) => {
  try {
    const { skill, location, country, gender } = req.query;
    const creatives = await new Creatives({
      skill,
      location,
      country,
      gender,
    }).searchCreatives();
    return success(res, { creatives });
  } catch (err) {}
};

module.exports.sendBargain = async (req, res) => {
  try {
    const { projectDescription, proposedPrice, recieverId, senderId, skill } =
      req.body;
    const creatives = await new Creatives({
      skill,
      projectDescription,
      proposedPrice,
      recieverId,
      senderId,
    }).sendBargain();
    return success(res, { creatives });
  } catch (err) {
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.acceptBargain = async (req, res) => {
  try {
    const { response, id } = req.query;
    // const id = req.user._id
    console.log({ id, response });
    const creatives = await new Creatives({
      id,
      response,
    }).acceptBargain();
    return success(res, { creatives });
  } catch (err) {
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.getBargains = async (req, res) => {
  try {
    const bargains = await new Creatives().getBargains();
    return success(res, { bargains });
  } catch (err) {
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.getBargainById = async (req, res) => {
  try {
    const bargains = await new Creatives({
      id: req.params.id,
    }).getBargainById();
    return success(res, { bargains });
  } catch (err) {
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.getBargainByUserId = async (req, res) => {
  try {
    const bargains = await new Creatives({
      id: req.params.id,
    }).getBargainByUserId();
    return success(res, { bargains });
  } catch (err) {
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.reviewCreative = async (req, res) => {
  try {
    const { userId, stars, comment } = req.body;
    const bargains = await new Creatives({
      userId,
      stars,
      comment,
    }).reviewCreative();
    return success(res, { bargains });
  } catch (err) {
    return error(res, { code: err.code, message: err.message });
  }
};

module.exports.getUserReview = async (req, res) => {
  try {
    const { userId } = req.query;
    const bargains = await new Creatives({
      userId,
    }).getUserReview();
    return success(res, { bargains });
  } catch (err) {
    return error(res, { code: err.code, message: err.message });
  }
};
