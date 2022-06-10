"use strict";

const express = require("express"),
  router = express.Router(),
  logger = require("../util/logging"),
  users = require("../domain/services/user.service");

console.log("[[ STREAM ]]");
logger.LogInfo("[GET] = /api/v1/stream/");
logger.LogInfo("[GET] = /api/v1/stream/:userID");
logger.LogInfo("[GET] = /api/v1/stream/:userID/:deviceID");

router.get("/", users.GetAll);
router.get("/:userID", users.GetUserByID);
router.get("/:userID/:deviceID", users.GetActiveDevices);

module.exports = router;
