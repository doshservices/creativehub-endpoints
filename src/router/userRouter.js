const userRoute = require("../core/routerConfig");
const user = require("../controller/userController");
const { authenticate, isAllowed } = require("../core/userAuth");

userRoute
  .route("/users")
  .post(user.signup)
  .get(user.getAllUsers)
  .patch(authenticate, user.verifyUserEmail);


userRoute.route("/users/login").post(user.login);

userRoute
  .route("/users/add-skills")
  .post(authenticate, user.updateUserDetails);

userRoute.route("/users/follow-user").post(authenticate, user.followUser);

userRoute.route("/users/unfollow-user").post(authenticate, user.unfollowUser);

userRoute.route("/users/forgot-password").post(authenticate, user.forgotPassword);

userRoute.route("/users/reset-password").post(authenticate, user.resetPassword);


userRoute.route("/users/:userId").get(user.getUserById);


module.exports = userRoute;
