module.exports = (db) => {
  let userSchema = new db.Schema({
    userID: String,
    devices: [
      {
        deviceID: String,
        connected_at: Date,
      },
    ],
  });
  return db.model("Users", userSchema);
};
