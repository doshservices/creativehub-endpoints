const creativeRouter = require("../core/routerConfig");
const Creatives = require("../controller/creativesController");
const { authenticate } = require("../core/userAuth");

creativeRouter
  .route("/creatives")
  .get(authenticate, Creatives.getAllCreatives)

  creativeRouter
  .route("/creatives/search").get( authenticate, Creatives.searchCreatives);



  module.exports = creativeRouter