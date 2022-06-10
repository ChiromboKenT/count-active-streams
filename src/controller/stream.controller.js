"use strict";

const express = require("express"),
  router = express.Router(),
  logger = require("../util/logging");
users = require("../domain/services/service-user");

console.log("[[ USERS ]]");
logger.LogInfo("[GET] = /");
logger.LogInfo("[GET] = /:userID");
logger.LogInfo("[GET] = /:userID/:deviceID");

router.get("/", users.GetAll);
router.get("/:userID", users.GetUserByID);
router.get("/:userID/:deviceID", GetActiveDevices);

module.exports = router;
