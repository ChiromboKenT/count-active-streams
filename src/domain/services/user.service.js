const userAdapter = require("../adapter/user.adapter");
const { isUuid, uuid } = require("uuidv4");
const httpCode = require("../../util/http-enum");

//TODO: ADD SUPPORT FOR MORE SERVICES
//TODO: ADD FILTERING and PAGINATION
exports.GetAll = async (req, res) => {
  let status = httpCode.SUCCESS,
    errorCode = null,
    data = "",
    message = "";

  try {
    const users = await userAdapter.GetAllUsers();
    if (!users) throw new Error("Bad Request");
    if (users.err) {
      status = httpCode.ERROR;
      errorCode = users.err.code;
      message = users.err.message;
      statusCode = httpCode.BAD_REQUEST;
    } else {
      statusCode = users.length > 0 ? httpCode.OK : httpCode.NO_CONTENT;
      data = users.map((d) => ({
        ...d,
        maxActive: d.activeDevices.length > 2,
        deviceCount: d.activeDevices.length,
      }));
      message = "GetAllUsers response successfull ";
    }
    return res.status(statusCode).json({
      status,
      data,
      errorCode,
      message,
    });
  } catch (error) {
    console.log("err = ", err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      status: httpCode.ERROR,
      errorCode: httpCode.CRASH_LOGIC,
      message: err,
    });
  }
};

exports.GetUserByID = async (req, res) => {
  let status = httpCode.SUCCESS,
    errorCode = null,
    data = "",
    message = "";

  try {
    const { userId } = req.params;
    if (!isUuid(userId)) throw new Error("UserID is not valid");
    const user = await userAdapter.GetUserByID(userId);
    if (user) {
      if (user.err) {
        status = httpCode.ERROR;
        errorCode = user.err.code;
        message = user.err.message;
        statusCode = httpCode.BAD_REQUEST;
      } else {
        statusCode = httpCode.OK;
        data = user;
        message = "GetUserByID response successfull ";
      }
    } else {
      status = httpCode.ERROR;
      errorCode = httpCode.ID_NOT_FOUND;
      message = "RESOURCE NOT FOUND";
      statusCode = httpCode.NOT_FOUND;
    }

    return res.status(statusCode).json({
      status,
      data,
      errorCode,
      message,
    });
  } catch (error) {
    console.log("err = ", err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      status: httpCode.ERROR,
      errorCode: httpCode.CRASH_LOGIC,
      message: err,
    });
  }
};

exports.AddUser = async (req, res) => {
  let status = httpCode.SUCCESS,
    errorCode = null,
    data = "",
    message = "";

  try {
    const { deviceID } = req.params;
    const userId = uuid();
    const devices = [deviceID];

    const response = await userAdapter.AddUser(userId, devices);
    if (!response) throw new Error("Bad Request");
    if (response.err) {
      status = httpCode.ERROR;
      errorCode = response.err.code;
      message = response.err.message;
      statusCode = httpCode.BAD_REQUEST;
    } else {
      statusCode = httpCode.CREATED;
      data = response;
      message = "Created response successfull ";
    }

    return res.status(statusCode).json({
      status,
      data,
      errorCode,
      message,
    });
  } catch (error) {
    console.log("err = ", err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      status: httpCode.ERROR,
      errorCode: httpCode.CRASH_LOGIC,
      message: err,
    });
  }
};

exports.GetActiveDevices = async (req, res) => {
  let status = httpCode.SUCCESS,
    errorCode = null,
    data = "",
    message = "";

  try {
    const { userId, deviceID } = req.params;
    if (!isUuid(userId)) throw new Error("UserID is not valid");
    const user = await userAdapter.GetUserByID(userId);
    if (user) {
      if (user.err) {
        status = httpCode.ERROR;
        errorCode = user.err.code;
        message = user.err.message;
        statusCode = httpCode.BAD_REQUEST;
      } else {
        data = user;
        data["maxActive"] = true;
        data["deviceCount"] = user.activeDevices.length;
        statusCode = httpCode.OK;
        message = "GetUserByID response successfull ";
        if (user.activeDevices.length > 2) {
          data["maxActive"] = false;
          userAdapter.UpdateById(userId, [...user.activeDevices, deviceID]);
        }
      }
    } else {
      status = httpCode.ERROR;
      errorCode = httpCode.ID_NOT_FOUND;
      message = "RESOURCE NOT FOUND";
      statusCode = httpCode.NOT_FOUND;
    }

    return res.status(statusCode).json({
      status,
      data,
      errorCode,
      message,
    });
  } catch (error) {
    console.log("err = ", err);
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      status: httpCode.ERROR,
      errorCode: httpCode.CRASH_LOGIC,
      message: err,
    });
  }
};