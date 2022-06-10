const httpCodes = require("./http-enum");
exports.LogSuccess = (msg) => {
  console.log(httpCodes.GREEN_LOG, msg);
};
exports.LogInfo = (msg) => {
  console.log(httpCodes.CYAN_LOG, msg);
};
exports.LogWarning = (msg) => {
  console.log(httpCodes.YELLOW_LOG, msg);
};
exports.LogDanger = (msg) => {
  console.log(httpCodes.RED_LOG, msg);
};
