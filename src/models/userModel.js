const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const { throwError } = require("../utils/handleErrors");
const {
  GENDER,
  USER_TYPE,
  SERVICE_TYPE,
  SUBSCRITION_STATUS,
  ACCOUNT_STATUS,
  LANGUAGE_PROFICIENCY,
} = require("../utils/constants");

const Schema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
    enum: Object.keys(GENDER),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email!");
      }
      return validator.isEmail(value);
    },
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profileImg: {
    type: String,
  },
  skills: {
    type: [
      {
        skill: String,
        experience_level: {
          type: String,
          enum: Object.values(LANGUAGE_PROFICIENCY),
        },
      },
    ],
    default: [],
  },
  languages: {
    type: [
      {
        language: String,
        proficiency: {
          type: String,
          enum: Object.values(LANGUAGE_PROFICIENCY),
        },
      },
    ],
    default: [],
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  otp: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: Object.keys(USER_TYPE),
  },
  googleSigned: {
    type: Boolean,
    default: false,
    required: true,
  },
  status: {
    type: String,
    default: ACCOUNT_STATUS.ACTIVE,
    enum: Object.keys(ACCOUNT_STATUS),
  },
  followers: {
    type: Array,
    default: [],
  },
  certificates: {
    type: Array,
    default: [],
  },
  urls: {
    type: Array,
    default: [],
  },
  hourlyRate: {
    type: String,
  },
  subscribed: {
    type: String,
    enum: Object.keys(SUBSCRITION_STATUS),
    default: SUBSCRITION_STATUS.PENDING,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

Schema.pre("save", async function save(next) {
  try {
    const user = this;

    if (!user.isModified("password")) {
      return next();
    }
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (e) {
    next(e);
  }
});

Schema.statics.findByCredentials = async (loginId, password) => {
  const user = await userSchema
    .findOne({
      $or: [{ phoneNumber: loginId }, { email: loginId }],
    })
    .orFail(() => throwError("Invalid Login Details", 404));
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throwError("Incorrect Password");
  }
  return user;
};

// Add method to add more skills
Schema.methods.addSkills = async function(newSkills) {
  try {
    this.skills.push(...newSkills);
    await this.save();
    return this.skills;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Add method to add more languages
Schema.methods.addLanguages = async function(newLanguages) {
  try {
    // Push new languages to the existing languages array
    this.languages.push(...newLanguages);
    await this.save();
    return this.languages;
  } catch (error) {
    throw new Error(error.message);
  }
};


Schema.plugin(uniqueValidator, { message: "{TYPE} must be unique." });

const userSchema = mongoose.model("user", Schema);

module.exports = userSchema;
