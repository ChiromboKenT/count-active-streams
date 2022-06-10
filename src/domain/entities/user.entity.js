module.exports = (db) => {
  let userSchema = new db.Schema({
    userID: String,
    activeDevices: [String],
  });
  return db.model("Users", userSchema);
};
