const server = require("./src/server/index"),
  { server: config } = require("./config");

server.listen(config.port, () => {
  console.log(`⚡ Server listening on PORT:${config.port}`);
});

server.on("error", (err) => {
  console.error(err);
});

async function closeGracefully(signal) {
  process.exit(1);
}
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  closeGracefully(); // mandatory (as per the Node.js docs)
});

process.on("SIGINT", closeGracefully);
