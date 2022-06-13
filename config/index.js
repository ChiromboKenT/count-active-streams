const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  server: {
    port: process.env.PORT,
  },
  db: {
    port: process.env.DB_PORT,
    url: process.env.DB_URL,
    nameconn: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
  },
};
