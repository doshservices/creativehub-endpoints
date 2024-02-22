const {
  SENDGRID_API_KEY,
  VERIFIED_EMAIL,
  FRONTEND_BASE_URL,
} = require("../core/config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);
const { logger } = require("../utils/logger");
const userSchema = require("../models/userModel");
const { throwError } = require("./handleErrors");
const verificationCode = Math.floor(100000 + Math.random() * 100000);

async function sendEmailToken(Email, otp) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Activation Token",
    dynamic_template_data: {
      otp: otp,
    },
    template_id: "d-70aad94b16b94260a58d1aaac3a290e8",
  };
  return sgMail
    .send(msg)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      if (error.response) {
        const { response } = error;
        const { body } = response;
        return body;
      }
    });
}

async function sendResetPasswordToken(Email, firstName, otp) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Password Reset Token",
    template_id: "d-40994e2030b74f369e27a441394f3f86",
    dynamic_template_data: {
      otp: otp,
    },
  };
  return sgMail
    .send(msg)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      if (error.response) {
        const { response } = error;
        const { body } = response;
      }
    });
}

async function registrationSuccessful(Email, name) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Registration Successful",
    dynamic_template_data: {
      name: name,
      verificationUrl: `${FRONTEND_BASE_URL}/verify-email?email=${Email}`,
    },
    template_id: "d-94a0b7462fbf41f8ad783749337ace8f",
  };
  try {
    const result = await sgMail.send(msg);
    return result;
  } catch (error) {
    if (error.response) {
      const { response } = error;
      const { body } = response;
      console.error(body);
    }
  }
}

function passwordEmail(Name, Email, link) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Reset Your Password",
    html: ``,
  };

  return sgMail
    .send(msg)
    .then((result) => {})
    .catch((error) => {
      // Log friendly error
      if (error.response) {
        // Extract error msg
        const { message, code, response } = error;

        // Extract response msg
        const { headers, body } = response;
      }
    });
}

function SuccessfulPasswordReset(Name, Email) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Your Password Reset Successful",
    html: ``,
  };

  return sgMail
    .send(msg)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      // Log friendly error
      if (error.response) {
        // Extract error msg
        const { message, code, response } = error;

        // Extract response msg
        const { headers, body } = response;
      }
    });
}

async function bargainEmail(Name, Email, CheckOut, Response) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Bargain Confirmation",
    html: `<h1>Dear ${Name},</h1>
        <p>Your bargain has been ${Response}</p>
        <p>click the link below to pay for the service</p>
        <a href="${CheckOut}">${CheckOut}</a>`,
  };

  try {
    const result = await sgMail.send(msg);
    return result;
  } catch (error) {
    // Log friendly error
    console.error(error);

    if (error.response) {
      // Extract error msg
      const { message: message_1, code, response } = error;

      // Extract response msg
      const { headers, body } = response;

      console.error(body);
    }
  }
}

async function sendEmailVerificationToken(email) {
  try {
    const verificationCode1 = Math.floor(100000 + Math.random() * 100000);
    const user = await userSchema.findOne({ email });
    if (user) {
      user.otp = verificationCode1;
      await user.save();
      await sendEmailToken(email, verificationCode1);
      return {
        message: `OTP Message sent to ${email} successfully`,
        status: 200,
      };
    }
    throwError(`Email ${email} Does Not Exists`, 404);
  } catch (error) {
    logger.error("Error occurred sending token", error);
    return throwError(error.message, error.code);
  }
}

module.exports = {
  sendEmailToken,
  sendEmailVerificationToken,
  passwordEmail,
  SuccessfulPasswordReset,
  registrationSuccessful,
  sendResetPasswordToken,
  bargainEmail,
  verificationCode,
};
