/*eslint-disable*/
const { createTransferRecipient } = require("../integrations/paystackClient");
const BankSchema = require("../models/bankModel");
const { throwError } = require("../utils/handleErrors");
let localBankList = require("../../banks.json");
// const redisClient = require("../service/Redis");
const paystackClient = require("../integrations/paystackClient");
const { validateParameters } = require("../utils/util");
const NO_BANK_ADDED = (message) =>
  throwError(message || "No Bank Found For User", 404);

class Bank {
  constructor(data) {
    this.data = data;
    this.errors = [];
  }

  async _bankExist() {
    const { userId, accountNumber } = this.data;
    const existingBank = await BankSchema.findOne({ userId, accountNumber });
    if (existingBank) {
      throwError("Bank Already Exist");
    }
  }

  async addBank() {
    let newBankRequest = this.data;
    const { isValid, messages } = validateParameters(
      ["userId", "accountNumber", "bankCode"],
      newBankRequest
    );
    if (!isValid) {
      throwError(messages);
    }
    const { userId, bankCode, accountNumber } = newBankRequest;
    const existingUserBanks = await BankSchema.find({ userId });
    if (!existingUserBanks.length) {
      newBankRequest["isDefaultBank"] = true;
    }
    await this._bankExist();
    if (this.errors.length) {
      throwError(this.errors);
    }
    const bankDetails = await createTransferRecipient({
      account_number: accountNumber,
      bank_code: bankCode,
    });
    newBankRequest = { ...newBankRequest, ...bankDetails };
    return await new BankSchema(newBankRequest).save();
  }

  async getBank() {
    return await BankSchema
      .findById(this.data)
      .orFail(() => NO_BANK_ADDED("Bank Not Found"));
  }

  getAllUserBank() {
    return BankSchema.find({ userId: this.data }).orFail(NO_BANK_ADDED);
  }

  async getDefaultBank() {
    return await BankSchema
      .findOne({ userId: this.data.toString(), isDefaultBank: true })
      .orFail(NO_BANK_ADDED);
  }

  async changeDefaultBank() {
    const { userId, bankId } = this.data;
    const bank = await new Bank(bankId).getBank();
    if (bank.isDefaultBank) {
      throwError("This Is Already Your Default Bank");
    }
    bank.isDefaultBank = true;
    const defaultBank = await new Bank(userId).getDefaultBank();
    defaultBank.isDefaultBank = false;
    await Promise.all([defaultBank.save(), bank.save()]);
    return "Default Bank Updated";
  }

  async deleteBank() {
    await BankSchema
      .deleteOne({ _id: this.data })
      .orFail(() => throwError("Bank Not Found!", 404));
    return "Bank Deleted Successfully";
  }

  static async getBankList() {
    // const cachedBankList = await redisClient.getCachedData("banks");
    // if (!cachedBankList) {
      const banksFromPayStack = await paystackClient.getBanks();
      if (banksFromPayStack) {
        localBankList = banksFromPayStack;
      }
      let banks = localBankList.map((bank) => {
        return { name: bank.name, code: bank.code };
      });
      // redisClient.cacheData("banks", JSON.stringify(banks), 2630000);
      return banks;
    // }
    // return JSON.parse(cachedBankList);
  }
}

module.exports = Bank;
