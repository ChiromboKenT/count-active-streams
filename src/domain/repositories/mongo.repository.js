const { db: config } = require("../../../config");
const mongoose = require("mongoose");
const user = require("../entities/user.entity");
const logger = require("../../util/logging");

let arrayConns = [],
  db = {};
const uri = `mongodb+srv://${config.username}:${config.password}@cluster0.sc9c9.mongodb.net/?retryWrites=true&w=majority`;
try {
  mongoose.connect(uri);
  db[config.nameconn] = {};
  db[config.nameconn].conn = mongoose;
  db[config.nameconn].User = user(mongoose);
} catch (err) {
  logger.LogDanger(`Database connection failed: ${err}`);
  db = null;
}

exports.db = db;
