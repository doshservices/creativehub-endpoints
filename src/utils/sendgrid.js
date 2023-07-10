const { SENDGRID_API_KEY, VERIFIED_EMAIL } = require("../core/config");
const sgMail = require("@sendgrid/mail");
const moment = require("moment");
sgMail.setApiKey(SENDGRID_API_KEY);
const { logger } = require("../utils/logger");
const verificationCode = Math.floor(100000 + Math.random() * 100000);

async function sendEmailToken(Email, token) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Activation Token",
    html: `token: ${token}`
  };
 return sgMail
    .send(msg)
    .then((result) => { 
      console.log(result)
      return result
  })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        const { response } = error;
        const { body } = response;
        return body;
      }
    });
}

async function  sendResetPasswordToken(Email, firstName, token) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Password Reset Token",
    html: ``,
  };
 return sgMail
    .send(msg)
    .then((result) => {
        console.log(result);
      return result;
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        const { response } = error;
        const { body } = response;
        console.error(body);
      }
    });
}

async function registrationSuccessful(Email, firstName) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Registration Successful",
    html: '<p>thank you for registering</p>'
  };
  try {
        const result = await sgMail
            .send(msg);
        return result;
    } catch (error) {
        console.log(error);
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
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      // Log friendly error
      console.error(error);

      if (error.response) {
        // Extract error msg
        const { message, code, response } = error;

        // Extract response msg
        const { headers, body } = response;

        console.error(body);
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
      console.error(error);

      if (error.response) {
        // Extract error msg
        const { message, code, response } = error;

        // Extract response msg
        const { headers, body } = response;

        console.error(body);
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
        const result = await sgMail
            .send(msg);
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
    await sendEmailToken(email, verificationCode1);
    // this.data(email, verificationCode1);
     console.log('Expected email:',email)
    return {
      message: `OTP Message sent to ${email} successfully`,
      data: "success",
      status: 200,
      code: verificationCode1,
    };
  } catch (error) {
    logger.error("Error occurred sending token", error);
    return {
      message: `Error occurred sending OTP Message to ${email}`,
      data: error.message,
      status: 500,
    };
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
