/*eslint-disable*/
const cron = require("node-cron");
const { DAILY_CRON_SCHEDULE } = require("../core/config");
const bargainSchema = require("../models/bargainModel");
const { BARGAIN_STATUS, NOTIFICATION_TYPE } = require("../utils/constants");
// const Notification = require("../service/Notification");
// const ledgerWallet = require("../models/ledgerWalletModel");
// const walletModel = require("../models/walletModel");

cron.schedule("* * * * *", async () => {
  const bargains = await bargainSchema.find({
    status: BARGAIN_STATUS.ACCEPTED,
  });
  bargains.forEach(async (bargain) => {
    // console.log(bargain);
    // createdAt is a more than 24 hours old bargain
    if (
      bargain.createdAt < Date.now() - 24 * 60 * 60 * 1000 ||
      bargain.updatedAt < Date.now() - 24 * 60 * 60 * 1000
    ) {
      // console.log({ bargain });
    }
  });
});

// cron.schedule(DAILY_CRON_SCHEDULE, async () => {
//   const ledgerWallets = await ledgerWallet.find({});
//   ledgerWallets.forEach(async (wallet) => {
//     // createdAt is a more than 24 hours old booking
//     if (wallet.createdAt < Date.now() - 12 * 60 * 60 * 1000) {
//       const withdrawableWallets = await walletModel.find({
//         userId: wallet.userId,
//       });
//       if (withdrawableWallets) {
//         console.log({ withdrawableWallets });
//         withdrawableWallets.forEach(async (withdrawableWallet) => {
//           withdrawableWallet.availabelBalance += wallet.availableBalance;
//           await ledgerWallet.deleteOne({ _id: wallet._id });
//         });
//       }
//     }
//   });
// });
