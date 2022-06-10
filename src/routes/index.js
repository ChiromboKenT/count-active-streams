"use strict";
const apiServices = require("../controller/stream.controller");
const routers = (app) => {
  app.use("/api/v1/stream", apiServices);
};

module.exports = routers;
