const creativeRouter = require("../core/routerConfig");
const Creatives = require("../controller/creativesController");
const { authenticate } = require("../core/userAuth");

creativeRouter.route("/creatives").get(authenticate, Creatives.getAllCreatives);

creativeRouter
  .route("/creatives/search")
  .get(authenticate, Creatives.searchCreatives);

creativeRouter
  .route("/creatives/bargain")
  .post(authenticate, Creatives.sendBargain)
  .patch(authenticate, Creatives.acceptBargain)
  .get(authenticate, Creatives.getBargains);

module.exports = creativeRouter;
