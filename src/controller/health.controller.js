"use strict";

const express = require("express"),
  router = express.Router(),
  logger = require("../util/logging"),
  users = require("../domain/services/user.service");

console.log("[[ HEALTH CHECKING ]]");
logger.LogInfo("[GET] = /");

// router.post(/:userID/, users.RemoveUserStream);
router.get("/", (req, res) => res.statusCode(200).json({ status: "success" }));

module.exports = router;
