"use strict";

const express = require("express"),
  router = express.Router(),
  logger = require("../util/logging"),
  users = require("../domain/services/user.service");

console.log("[[ USERS ]]");
logger.LogInfo("[GET] = /api/v1/users/:userID");

router.get("/", users.GetAllUsers);
router.get("/:userID", users.GetUserByID);
router.post("/", users.AddUser);

module.exports = router;
