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
