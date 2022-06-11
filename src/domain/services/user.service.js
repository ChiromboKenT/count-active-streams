const userAdapter = require("../adapter/user.adapter");
const httpCode = require("../../util/http-enum");
const { LogDanger } = require("../../util/logging");

//TODO: ADD SUPPORT FOR MORE SERVICES
//TODO: ADD FILTERING and PAGINATION

/**
 *
 *
 * @param {RequestObject} req - eg.Express request object from router
 * @param {ResponseObject} res - eg.Express response object with response http response methods
 * @returns Uses response methods to return JSON data to client.
 */

exports.GetAllUsers = async (req, res) => {
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
      data = users.map((user) => ({
        ...user,
        streamCount: user.activeStreams ? user.activeStreams.length : 0,
      }));

      message = "GetAllUsers response successfull ";
    }
    return res.status(statusCode).json({
      status,
      data,
      errorCode,
      message,
    });
  } catch (err) {
    LogDanger(`err.GetAllUsers.service = ${err}`);
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
    const { userID } = req.params;

    if (!userID) throw new Error("UserID is not valid");
    const user = await userAdapter.GetUserByID(userID);

    if (user) {
      if (user.err) {
        status = httpCode.ERROR;
        errorCode = user.err.code;
        message = user.err.message;
        statusCode = httpCode.BAD_REQUEST;
      } else {
        statusCode = httpCode.OK;
        data = user;
        data["streamCount"] = data.activeStreams.length;
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
  } catch (err) {
    LogDanger(`err.GetUserByID.service = ${err}`);
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      status: httpCode.ERROR,
      errorCode: httpCode.CRASH_LOGIC,
      message: err,
    });
  }
};

exports.GetUserStreams = async (req, res) => {
  let status = httpCode.SUCCESS,
    errorCode = null,
    data = "",
    message = "";

  try {
    const { userID, deviceID } = req.params;
    const maxStream = parseInt(req.query.maxStream) || 1;

    if (!userID) throw new Error("UserID is not valid");
    if (!deviceID) throw new Error("DeviceID is not valid");
    const user = await userAdapter.GetUserByID(userID);

    if (user) {
      if (user.err) {
        status = httpCode.ERROR;
        errorCode = user.err.code;
        message = user.err.message;
        statusCode = httpCode.BAD_REQUEST;
      } else {
        statusCode = httpCode.OK;
        data = user;
        data["maxActiveStream"] = data.activeStreams.length >= maxStream;
        data["streamCount"] = data.activeStreams.length;

        if (data.activeStreams.length < maxStream)
          try {
            await userAdapter.UpdateBySubId(userID, deviceID);
          } catch (err) {
            throw new Error(`Failed to add Device to active streams - ${err}`);
          }
        message = "GetUserStreamByID response successfull ";
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
  } catch (err) {
    LogDanger(`err.GetUserStreams.service = ${err}`);
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
    const { streamID } = req.body;
    const streams = [streamID];

    const response = await userAdapter.AddUser(streams);
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
  } catch (err) {
    LogDanger(`err.AddUser.service = ${err}`);
    return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      status: httpCode.ERROR,
      errorCode: httpCode.CRASH_LOGIC,
      message: err,
    });
  }
};

//TODO: Add Remove Stream
