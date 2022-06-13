"use strict";
const streamController = require("../controller/stream.controller");
const userController = require("../controller/user.controller");
const healthController = require("../controller/health.controller");
const routers = (app) => {
  app.use("/health", healthController);
  app.use("/api/v1/streams", streamController);
  app.use("/api/v1/users", userController);
};

module.exports = routers;
