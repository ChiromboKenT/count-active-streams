const { db } = require("../repositories/mongo.repository");
const { v4: uuidv4 } = require("uuid");
const { LogDanger } = require("../../util/logging");
const { response } = require("express");
const errorMessage = "Error orm-user.";

exports.GetAllUsers = async () => {
  try {
    return await db.connMongo.User.find(
      { IsDelete: false },
      { _id: 0, __v: 0 }
    ).lean();
  } catch (err) {
    LogDanger(`${errorMessage}.GetAllUsers = ${err}`);
    return { err: { code: 123, message: err } };
  }
};

exports.GetUserByID = async (userID) => {
  try {
    return await db.connMongo.User.findOne(
      {
        userID,
        IsDelete: false,
      },
      { _id: 0, __v: 0 }
    ).lean();
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
exports.removeBySubId = async (userID, streamToRemove) => {
  try {
    await db.connMongo.User.findOneAndUpdate(
      {
        userID,
      },
      { $pull: { activeStreams: { $elemMatch: streamToRemove } } }, // item(s) to match from array you want to pull/remove
      { multi: true } // set this to true if you want to remove multiple elements.
    );
    return true;
  } catch (err) {
    LogDanger(`${errorMessage}.removeBySubId = ${err}`);
    return { err: { code: 123, message: err } };
  }
};
exports.UpdateBySubId = async (userID, streamToAdd) => {
  try {
    await db.connMongo.User.findOneAndUpdate(
      {
        userID,

        activeStreams: {
          $ne: [streamToAdd],
        },
      },
      {
        $addToSet: {
          activeStreams: streamToAdd,
        },
      }
    );
    return true;
  } catch (err) {
    LogDanger(`${errorMessage}.UpdateBySubId = ${err}`);
    return { err: { code: 123, message: err } };
  }
};
