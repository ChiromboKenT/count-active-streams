"use strict";

const express = require("express"),
  router = express.Router(),
  logger = require("../util/logging"),
  users = require("../domain/services/user.service");

console.log("[[ STREAM Checking]]");
logger.LogInfo("[GET] = /api/v1/stream/");
logger.LogInfo("[GET] = /api/v1/stream/:userID");
logger.LogInfo("[GET] = /api/v1/stream/:userID/:deviceID");

// router.post(/:userID/, users.RemoveUserStream);
router.get("/:userID/:deviceID", users.GetUserStreams);

module.exports = router;
