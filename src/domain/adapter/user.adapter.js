const { db } = require("../repositories/mongo.repository");
const { uuid } = require("uuidv4");

const errorMessage = "Error orm-user.";
exports.GetAllUsers = async () => {
  try {
    return await db.connMongo.User.find({ IsDelete: false });
  } catch (err) {
    console.log(errorMessage, "GetAllUsers = ", err);
    return { err: { code: 123, messsage: err } };
  }
};
exports.GetAllUserDevices = async (userID) => {
  try {
    const user = await db.connMongo.User.find({ IsDelete: false });
    return user.activeDevices;
  } catch (err) {
    console.log(errorMessage, "GetAllUserDevices = ", err);
    return { err: { code: 123, messsage: err } };
  }
};

exports.GetUserByID = async (userId) => {
  try {
    return await db.connMongo.User.findOne({ userId, IsDelete: false });
  } catch (err) {
    console.log(errorMessage, "GetuserByID = ", err);
    return { err: { code: 123, messsage: err } };
  }
};

exports.AddUser = async (userId, activeDevices) => {
  try {
    const dataToSave = await new db.connMongo.User({
      userId: uuid(),
      activeDevices,
      IsDelete: false,
    });
    dataToSave.save();
    return true;
  } catch (err) {
    console.log(errorMessage, "AddUser = ", err);
    return { err: { code: 123, messsage: err } };
  }
};

exports.DeleteById = async (userId) => {
  try {
    await db.connMongo.User.findOneAndUpdate({ userId }, { IsDelete: true });
    return true;
  } catch (err) {
    console.log(errorMessage, "Delete = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.UpdateById = async (userId, activeDevices) => {
  try {
    await db.connMongo.User.findOneAndUpdate(
      {
        userId,
      },
      {
        activeDevices,
      }
    );
    return true;
  } catch (err) {
    console.log(errorMessage, "UpdateById = ", err);
    return { err: { code: 123, messsage: err } };
  }
};
