const userRoute = require("../core/routerConfig");
const user = require("../controller/userController");
const { authenticate, isAllowed } = require("../core/userAuth");
const { redisCacheMiddleware } = require("../core/redis");

userRoute
  .route("/users")
  .post(user.signup)
  .get(user.getAllUsers)
  .patch(user.verifyUserEmail);

userRoute.route("/users/login").post(
  // redisCacheMiddleware(), 
  user.login);

userRoute.route("/users/send-token").post(user.sendOtp);

userRoute.route("/users/add-skills").post(authenticate, user.updateUserDetails);

userRoute.route("/users/follow-user").post(authenticate, user.followUser);

userRoute.route("/users/unfollow-user").post(authenticate, user.unfollowUser);

userRoute
  .route("/users/forgot-password")
  .post(authenticate, user.forgotPassword);

userRoute.route("/users/reset-password").post(authenticate, user.resetPassword);

userRoute.route("/users/get-banks").get(user.getBanks);

userRoute.route("/users/add-bank").post(authenticate, user.addBank);

userRoute.route("/users/:userId").get(
  // redisCacheMiddleware(), 
  user.getUserById);

module.exports = userRoute;
