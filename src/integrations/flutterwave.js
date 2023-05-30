// /*eslint-disable*/
var axios = require("axios");
// const keys = require("../core/config");
const FlutterSchema = require("../models/flutterModel");
const userSchema = require("../models/userModel");
const Flutterwave = require("flutterwave-node-v3");
const { BACKEND_BASE_URL, FLW_SECRET_KEY, FLW_PUBLIC_KEY, PLAN_ID} = require("../core/config");
const { SUBSCRITION_STATUS } = require("../utils/constants");
const flw = new Flutterwave(
 FLW_PUBLIC_KEY,
 FLW_SECRET_KEY
);

exports.initiatePaymentFlutterwave = async (
  amount,
  email,
  phone,
  name,
  userId
) => {
  try {
    let data = JSON.stringify({
      tx_ref: "PS_" + Math.floor(Math.random() * 100000000 + 1),
      amount: amount,
      currency: "NGN",
      redirect_url: `${BACKEND_BASE_URL}/flutterResponse?amount=${amount}`,
      customer: {
        email: email,
        phonenumber: phone,
        name: name,
      },
      meta: {
        consumer_email: email,
        userId
    },
      payment_plan: PLAN_ID,
    });
    var config = {
      method: "post",
      url: "https://api.flutterwave.com/v3/payments",
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      data: data
    };

    return axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
      });
  } catch (err) {
    console.log(err.message);
  }
};

exports.flutterPaymentCallback = async (req, res) => {
  if (req.query.status === "successful") {
    console.log(req.query);
  }
};

exports.flutterResponse = async (req, res) => {
  const { amount, status, tx_ref, transaction_id } = req.query;
  flw.Transaction.verify({ id: transaction_id })
    .then(async (response) => {
      // console.log("this is some test",response.data.amount == amount);
      if (
        response.data.status == "successful" &&
        response.data.amount == amount &&
        response.data.currency === "NGN"
      ) {
        // things you can save from flutterwave into your schema
        let user_id = response.data.meta.userId;
        let status_ = response.data.status;

        await userSchema.findByIdAndUpdate({_id: user_id}, {subscribtion: SUBSCRITION_STATUS.SUCCESS})
        //kindly save this correctly
        const flutterDetails = new FlutterSchema({
          amount,
          status_,
          tx_ref,
          transaction_id,
          user_id,
        });
        flutterDetails.save();


        res.send({msg:'Payment Successful', status: response.data.status, tx_ref})
      } else {
        // Inform the customer their payment was unsuccessful
        res.send({msg:'Payment Failed', status: response.data.status, tx_ref})
        console.log("Payment Failed");
      }
    })
    .catch(err => console.log(err));
};
