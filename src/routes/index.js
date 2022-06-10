"use strict";
const streamController = require("../controller/stream.controller");
const userController = require("../controller/user.controller");
const routers = (app) => {
  app.use("/api/v1/stream", streamController);
  app.use("/api/v1/users", userController);
};

module.exports = routers;
