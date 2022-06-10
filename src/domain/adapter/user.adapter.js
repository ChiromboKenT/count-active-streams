const { db } = require("../repositories/mongo.repository");
const { v4: uuidv4 } = require("uuid");
const { LogDanger } = require("../../util/logging");
const errorMessage = "Error orm-user.";
exports.GetAllUsers = async () => {
  try {
    await db.connMongo.User.find({ IsDelete: false }, { _id: 0, __v: 0 });

    return await db.connMongo.User.aggregate(
      [{ $addFields: { streamCount: { $size: "$activeStreams" } } }],
      { _id: 0, __v: 0 }
    );
  } catch (err) {
    LogDanger(`${errorMessage}.GetAllUsers = ${err}`);
    return { err: { code: 123, message: err } };
  }
};
exports.GetAllUserStreams = async (userID) => {
  try {
    const user = await db.connMongo.User.find(
      { IsDelete: false },
      { _id: 0, __v: 0 }
    );
    return user.activeStreams;
  } catch (err) {
    LogDanger(`${errorMessage}.GetAllUserStreams = ${err}`);
    return { err: { code: 123, message: err } };
  }
};

exports.GetUserByID = async (userID) => {
  try {
    await db.connMongo.User.findOne({
      userID,
      IsDelete: false,
    });

    return await db.connMongo.User.aggregate(
      [{ $addFields: { streamCount: { $size: "$activeStreams" } } }],
      { _id: 0, __v: 0 }
    );
  } catch (err) {
    LogDanger(`${errorMessage}.GetUserByID = ${err}`);
    return { err: { code: 123, message: err } };
  }
};

exports.AddUser = async (activeStreams) => {
  try {
    const dataToSave = await new db.connMongo.User({
      userID: uuidv4(),
      activeStreams,
      IsDelete: false,
    });
    await dataToSave.save();
    return true;
  } catch (err) {
    LogDanger(`${errorMessage}.AddUser = ${err}`);
    if (err.code === 11000) {
      return {
        err: {
          name: "duplicate key",
          code: 11000,
          message: "User Already Exists",
        },
      };
    } else {
      return { err: { code: 123, message: err } };
    }
  }
};

exports.DeleteById = async (userID) => {
  try {
    await db.connMongo.User.findOneAndUpdate({ userID }, { IsDelete: true });
    return true;
  } catch (err) {
    LogDanger(`${errorMessage}.DeleteById = ${err}`);
    return { err: { code: 123, message: err } };
  }
};

exports.UpdateById = async (userID, activeStreams) => {
  try {
    await db.connMongo.User.findOneAndUpdate(
      {
        userID,
      },
      {
        activeStreams,
      }
    );
    return true;
  } catch (err) {
    LogDanger(`${errorMessage}.UpdateById = ${err}`);
    return { err: { code: 123, message: err } };
  }
};
