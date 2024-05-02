/*eslint-disable*/
const walletModel = require("../models/walletModel");
const UserSchema = require("../models/userModel");
const { throwError } = require("../utils/handleErrors");
const util = require("../utils/util");
// const { getCachedData } = require("../service/Redis");
const Bank = require("./BANK");
const Transaction = require("./TRANSACTION");
const {
  withdrawToBank,
  initializePayment,
  verifyPayment,
  initializePaymentForSavedCard,
  finalizeWithdrawToBank,
} = require("../integrations/paystackClient");
const { TRANSACTION_STATUS, TRANSACTION_TYPE } = require("../utils/constants");
const debitCardModel = require("../models/DebitCard");

class Wallet {
  constructor(data) {
    this.data = data;
    this.errors = [];
  }

  async createWallet() {
    return await new walletModel(this.data).save();
  }

  async getUserWallet() {
    return await walletModel
      .findOne({ userId: this.data })
      .populate("userId")
      .orFail(() => throwError("Wallet Not Found", 404));
  }

  async creditWallet(amount, userId) {
    const userWallet = await walletModel
      .findOne({ userId })
      .orFail(() => throwError("Wallet Not Found!!"));
    userWallet.availableBalance += Number(amount);
    return await userWallet.save();
  }

  async debitWallet() {
    const { amount, userId } = this.data;
    const userWallet = await walletModel.findOne({ userId });
    userWallet.availableBalance -= Number(amount);
    return await userWallet.save();
  }

  async getUtilityWallet() {
    let utilityWallet = await walletModel.findOne({ label: "Collections" });
    if (!utilityWallet) {
      utilityWallet = await new walletModel({
        userId: `booking-collection`,
        label: "Collections",
      }).save();
    }
    return utilityWallet;
  }

  async debitUtilityWallet(amount) {
    const utilityWallet = await this.getUtilityWallet();
    utilityWallet.availableBalance -= Number(amount);
    return await utilityWallet.save();
  }

  async withdrawFund() {
    const { userId, amount, withdrawalReason } = this.data;
    this.data = userId;
    const userWallet = await this.getUserWallet();
    let walletBalance = userWallet.availableBalance;
    if (walletBalance < amount) {
      throwError("Insufficient Balance! Withdrawal Exceeds Available Balance!");
    }
    const userBankDetails = await new Bank(userId).getDefaultBank();
    const { status, reference, paymentDate, transfer_code } =
      await withdrawToBank(
        userBankDetails.recipientCode,
        amount,
        withdrawalReason
      );
    const transactionDetails = {
      userId: userId,
      amount: amount,
      reason: withdrawalReason || "Withdraw From Wallet",
      type: TRANSACTION_TYPE.WITHDRAWAL,
      reference: "WD" + Date.now().valueOf() + "REF" + reference,
      paymentDate: paymentDate,
      transfer_code,
    };
    await Transaction.createTransaction(transactionDetails);
    return {
      msg: "Withdrawal Successful, Verification Otp Has Been Sent!!",
      status,
      transfer_code,
    };
  }

  async verifyWithdrawFund() {
    const { userId, transfer_code, otp } = this.data;
    this.data = userId;
    const userWallet = await this.getUserWallet();
    const transactionDetails = await new Transaction(
      this.data
    ).getTransactionByTransferCode();
    let walletBalance = userWallet.availableBalance;
    walletBalance -= Number(transactionDetails.amount);
    const { status } = await finalizeWithdrawToBank(
      transfer_code,
      otp
    );
    if (status.toUpperCase() === TRANSACTION_STATUS.SUCCESS) {
      userWallet.availableBalance = walletBalance;
      await userWallet.save();
      transactionDetails.status = status.toUpperCase();
      await transactionDetails.save();
    }
    return "Withdrawal Successful";
  }

  async fundWallet() {
    const { amount, userId } = this.data;
    const user = await UserSchema.findById(userId);
    if (user) {
      const { reference, confirmationUrl } = await initializePayment(
        user.email,
        amount * 100
      );
      const transactionDetails = {
        userId: userId,
        amount: amount,
        reason: "Fund Wallet",
        type: TRANSACTION_TYPE.CREDIT,
        reference,
        paymentDate: Date.now(),
        status: TRANSACTION_STATUS.PENDING,
      };
      await Transaction.createTransaction(transactionDetails);
      return confirmationUrl;
    } 
  }

  async fundWalletWithSavedCard() {
    const { amount, userId } = this.data;
    const user = await UserSchema.findById(userId);
    const driver = await Driver.findById(userId);
    if (user) {
      const card = await debitCardModel.findOne({ email: user.email });
      const response = await initializePaymentForSavedCard(
        user.email,
        amount * 100,
        card.authorization_code
      );
      const transactionDetails = {
        userId: userId,
        amount: amount,
        reason: "Fund Wallet",
        type: TRANSACTION_TYPE.CREDIT,
        reference: response.reference,
        paymentDate: Date.now(),
        status: TRANSACTION_STATUS.PENDING,
      };
      await Transaction.createTransaction(transactionDetails);
      return response;
    } else if (driver) {
      const card = await debitCardModel.findOne({ email: driver.email });
      const response = await initializePaymentForSavedCard(
        driver.email,
        amount * 100,
        card.authorization_code
      );
      const transactionDetails = {
        userId: userId,
        amount: amount,
        reason: "Fund Wallet",
        type: TRANSACTION_TYPE.CREDIT,
        reference: response.reference,
        paymentDate: Date.now(),
        status: TRANSACTION_STATUS.PENDING,
      };
      await Transaction.createTransaction(transactionDetails);
      return response;
    }
  }


  //verify fund transfer
  async verifyFundTransfer() {
    const { status, authorization, customer } = await verifyPayment(this.data);
    const transactionDetails = await new Transaction(
      this.data
    ).getTransactionByReference();
    if (status.toUpperCase() === TRANSACTION_STATUS.SUCCESS) {
      await this.creditWallet(
        transactionDetails.amount,
        transactionDetails.userId
      );
      const user = await debitCardModel.findOne({ email: customer.email });
      if (!user) {
        await new debitCardModel({
          email: customer.email,
          ...authorization,
        }).save();
      }
      // await this.debitUtilityWallet(transactionDetails.amount);
      transactionDetails.status = status.toUpperCase();
      await transactionDetails.save();
    }
    return transactionDetails;
  }

  async creditUtilityWallet(amount) {
    const utilityWallet = await this.getUtilityWallet();
    utilityWallet.availableBalance += Number(amount);
    return await utilityWallet.save();
  }
}

module.exports = Wallet;
