module.exports = (db) => {
  let userSchema = new db.Schema(
    {
      userID: {
        type: String,
        unique: true,
      },
      activeStreams: [
        {
          type: String,
        },
      ],
    },
    { versionKey: false }
  );
  var handleE11000 = function (error, res, next) {
    if (error.name === "MongoError" && error.code === 11000) {
      next(new Error("There was a duplicate key error"));
    } else {
      next();
    }
  };

  userSchema.post("save", handleE11000);
  userSchema.post("update", handleE11000);
  userSchema.post("findOneAndUpdate", handleE11000);
  userSchema.post("insertMany", handleE11000);

  return db.model("Users", userSchema);
};
