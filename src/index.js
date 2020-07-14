const app = require("./app")();
const db = require("./models/sql");
const config = require("./configs");

/**
 * @name initializeDbAndStartServer
 * @description Initialize the database connection. Once the db is connected, start the server.
 */
const initializeDbAndStartServer = async () => {
  await db.connection.sync();
  console.info(`Database connected!`);
  app.listen(config.http.port);
  console.info(`campaign server listens on port ${config.http.port}`);
  console.info(`NODE_ENV = ${process.env.NODE_ENV || "dev"}`);
};

initializeDbAndStartServer();



