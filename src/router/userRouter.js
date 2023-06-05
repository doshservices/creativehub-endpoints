const userRoute = require("../core/routerConfig");
const user = require("../controllers/userController");
const { authenticate, isAllowed } = require("../core/userAuth");

userRoute
  .route("/users")
  .post(user.signup)
  .get(user.getAllUsers)
  .patch(authenticate, user.verifyUserEmail);


userRoute.route("/users/login").post(user.login);

userRoute
  .route("/users/add-interests")
  .post(authenticate, user.addUserInterest);

userRoute.route("/users/follow-user").post(authenticate, user.followUser);

userRoute.route("/users/unfollow-user").post(authenticate, user.unfollowUser);

userRoute.route("/users/reset-password").post(authenticate, user.resetPassword);


userRoute.route("/users/:userId").get(user.getUserById);


module.exports = userRoute;
