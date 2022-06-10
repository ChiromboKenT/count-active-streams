const { db: config } = require("../../../config");
const mongoose = require("mongoose");
const enum_ = require("../../util/magic");
const user = require("../entities/entity-user");

mongoose.set("useFindAndModify", false);

let arrayConns = [],
  db = {};

try {
  mongoose.connect(`mongodb://${c.host}/${c.database}`);
  db[c.nameconn] = {};
  db[c.nameconn].conn = mongoose;
  db[c.nameconn].User = user(mongoose);
} catch (err) {
  console.log(err);
  db = null;
}

//enum_.LogDanger("No hay ninguna base de datos vinculada");
exports.db = db;
