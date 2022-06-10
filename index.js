const server = require("./src/server/index"),
  { server: config } = require("./config");

server.listen(config.port, () => {
  console.log(`⚡ Server listening on PORT:${config.port}`);
});

server.on("error", (err) => {
  console.error(err);
});
