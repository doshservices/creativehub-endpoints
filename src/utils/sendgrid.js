const {
  SENDGRID_API_KEY,
  VERIFIED_EMAIL,
  FRONTEND_BASE_URL,
} = require("../core/config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);
const { logger } = require("../utils/logger");
const userSchema = require("../models/userModel");
const moment = require("moment");
const { throwError } = require("./handleErrors");
const { BARGAIN_STATUS } = require("./constants");
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

async function requestBargainEmail(
  Name,
  Email,
  SenderName,
  ProposedPrice,
  Description
) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Bargain Request",
    html: `<h3>Dear ${Name},</h3>
        <p>${SenderName} is in need of your services and have bargained for ${ProposedPrice} per hour. Let him know your decision</p>
        <br>
        <br>
        <h3>Service Description</h3>
        <p>${Description}</p>
        <br>
        <br>
        <h3>Proposed Price</h3>
        <p> ${ProposedPrice} </p>
        <p>Please click on the button below to let him know your decison.</p>
        <button style="background: purple; color: white;">Accept</button>
        <button style="background: white; color: purple;">Decline</button>
        <p>Thanks,
Creatives Hub Team.</p>
        `,
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

async function bargainPaidEmail(Name, Email, Amount, Sender) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: `Bargain Payment`,
    html: `<h3>Dear ${Name},</h3>
        <p>${Amount} has been paid to your wallet by ${Sender}</p>
        `,
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

async function bargainEmail(Name, Email, CheckOut, Response) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: `Bargain ${Response}`,
    html: `<h3>Dear ${Name},</h3>
        <p>Your bargain has been ${Response}</p>
        ${
          CheckOut
            ? `
        <p>click the link below to pay for the service</p>
        <a href="${CheckOut}">${CheckOut}</a>`
            : ""
        }`,
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
  requestBargainEmail,
  bargainPaidEmail,
  verificationCode,
};
