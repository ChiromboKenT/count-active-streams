const server = require("./src/server/index"),
  { server: config } = require("./config");

server.listen(config.port, () => {
  console.log(`⚡ Server listening on PORT:${config.port}`);
});

server.on("error", (err) => {
  console.error(err);
});

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1); // mandatory (as per the Node.js docs)
});
