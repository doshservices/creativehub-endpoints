const creativeRouter = require("../core/routerConfig");
const Creatives = require("../controller/creativesController");
const { authenticate } = require("../core/userAuth");
const { redisCacheMiddleware } = require("../core/redis");

creativeRouter
  .route("/creatives")
  .get(authenticate,
    //  redisCacheMiddleware(), 
     Creatives.getAllCreatives);

creativeRouter
  .route("/creatives/search")
  .get(authenticate, 
    // redisCacheMiddleware(), 
    Creatives.searchCreatives);

creativeRouter
  .route("/creatives/bargain")
  .post(authenticate, Creatives.sendBargain)
  .patch(authenticate, Creatives.acceptBargain)
  .get(authenticate, Creatives.getBargains);

creativeRouter
  .route("/creatives/bargain/verify-pay")
  .get(authenticate, Creatives.verifyBargainPayment);

creativeRouter
  .route("/creatives/review/")
  .post(authenticate, Creatives.reviewCreative)
  .get(authenticate, Creatives.getUserReview);

creativeRouter.get("/creatives/bargain/user/:id", Creatives.getBargainByUserId);
creativeRouter.get("/creatives/bargain/:id", Creatives.getBargainById);

module.exports = creativeRouter;
