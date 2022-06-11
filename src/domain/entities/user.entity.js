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
          unique: true,
        },
      ],
    },
    { versionKey: false }
  );

  return db.model("Users", userSchema);
};
